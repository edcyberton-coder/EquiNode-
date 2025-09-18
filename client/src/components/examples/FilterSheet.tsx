import { useState } from "react";
import { Button } from "@/components/ui/button";
import FilterSheet, { FilterOptions } from "../FilterSheet";

export default function FilterSheetExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: "all",
    priceRange: [0, 1000],
    distance: 10
  });

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-filter">
        Open Filter Sheet
      </Button>
      
      <FilterSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentFilters={filters}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          console.log('Filters applied:', newFilters);
        }}
      />
    </div>
  );
}