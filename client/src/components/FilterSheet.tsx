import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, DollarSign, Filter, X } from "lucide-react";

export interface FilterOptions {
  status: "all" | "available";
  priceRange: [number, number];
  distance: number; // in km
}

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

const priceRanges = [
  { label: "All Prices", min: 0, max: 1000 },
  { label: "KSh 0-50", min: 0, max: 50 },
  { label: "KSh 51-100", min: 51, max: 100 },
  { label: "KSh 101-200", min: 101, max: 200 },
  { label: "KSh 201+", min: 201, max: 1000 }
];

const distanceOptions = [
  { label: "Any Distance", value: 10 },
  { label: "< 500m", value: 0.5 },
  { label: "< 1km", value: 1 },
  { label: "< 2km", value: 2 },
  { label: "< 5km", value: 5 }
];

export default function FilterSheet({ isOpen, onClose, currentFilters, onApplyFilters }: FilterSheetProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    priceRanges.findIndex(range => 
      range.min === currentFilters.priceRange[0] && range.max === currentFilters.priceRange[1]
    ) || 0
  );

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      status: "all",
      priceRange: [0, 1000],
      distance: 10
    };
    setFilters(resetFilters);
    setSelectedPriceRange(0);
  };

  const activeFilterCount = () => {
    let count = 0;
    if (filters.status !== "all") count++;
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000) count++;
    if (filters.distance !== 10) count++;
    return count;
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Parking Spots
          </SheetTitle>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-filter"
          >
            <X className="w-4 h-4" />
          </Button>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Status Filter */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Spot Status</h3>
            <RadioGroup 
              value={filters.status} 
              onValueChange={(value: "all" | "available") => setFilters(prev => ({ ...prev, status: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="status-all" />
                <Label htmlFor="status-all" className="flex items-center gap-2">
                  All Spots
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-savanna rounded-full" />
                    <div className="w-3 h-3 bg-gold rounded-full" />
                    <div className="w-3 h-3 bg-destructive rounded-full" />
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="available" id="status-available" />
                <Label htmlFor="status-available" className="flex items-center gap-2">
                  Available Only
                  <div className="w-3 h-3 bg-savanna rounded-full" />
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Price Range
            </h3>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <Button
                  key={index}
                  variant={selectedPriceRange === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedPriceRange(index);
                    setFilters(prev => ({ ...prev, priceRange: [range.min, range.max] }));
                  }}
                  className="w-full justify-start"
                  data-testid={`button-price-${index}`}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Distance Filter */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Distance from You
            </h3>
            <div className="space-y-2">
              {distanceOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filters.distance === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, distance: option.value }))}
                  className="w-full justify-start"
                  data-testid={`button-distance-${option.value}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Summary */}
        {activeFilterCount() > 0 && (
          <div className="mt-6 p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Active Filters:</span>
                <Badge variant="secondary">{activeFilterCount()}</Badge>
              </div>
              <Button size="sm" variant="outline" onClick={handleReset} data-testid="button-reset-filters">
                Reset All
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
            data-testid="button-cancel-filter"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleApply}
            className="flex-1 bg-gold hover:bg-gold/90 text-gold-foreground"
            data-testid="button-apply-filters"
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}