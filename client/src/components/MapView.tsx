import { useState, useMemo } from "react";
import ParkingSpotMarker from "./ParkingSpotMarker";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Filter } from "lucide-react";
import type { FilterOptions } from "./FilterSheet";

interface ParkingSpot {
  id: string;
  lat: number;
  lng: number;
  status: "available" | "reserved" | "occupied";
  price?: number;
  name: string;
  distance: number;
  address: string;
  amenities: string[];
}

interface MapViewProps {
  spots: ParkingSpot[];
  onSpotClick?: (spot: ParkingSpot) => void;
  onSearch?: (query: string) => void;
  onLocationPress?: () => void;
  onFilterPress?: () => void;
  filters?: FilterOptions;
  activeFilterCount?: number;
}

export default function MapView({ 
  spots, 
  onSpotClick, 
  onSearch, 
  onLocationPress,
  onFilterPress,
  filters,
  activeFilterCount = 0
}: MapViewProps) {
  const [userLocation, setUserLocation] = useState({ lat: -1.286389, lng: 36.817223 }); // Nairobi center

  // Filter spots based on current filters
  const filteredSpots = useMemo(() => {
    if (!filters) return spots;
    
    return spots.filter(spot => {
      // Status filter
      if (filters.status === "available" && spot.status !== "available") {
        return false;
      }
      
      // Price filter
      if (spot.price && (spot.price < filters.priceRange[0] || spot.price > filters.priceRange[1])) {
        return false;
      }
      
      // Distance filter (simplified - in real app would use GPS calculation)
      if (spot.distance > filters.distance) {
        return false;
      }
      
      return true;
    });
  }, [spots, filters]);
  
  // Determine which spots should be grayed out
  const getSpotOpacity = (spot: ParkingSpot) => {
    if (!filters) return 1;
    return filteredSpots.includes(spot) ? 1 : 0.3;
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-primary/5 via-background to-savanna/5">
      {/* Search Bar */}
      <SearchBar 
        onSearch={onSearch}
        onLocationPress={() => {
          console.log("Getting current location...");
          onLocationPress?.();
        }}
        onFilterPress={onFilterPress}
        activeFilterCount={activeFilterCount}
      />
      
      {/* Results Counter */}
      {filters && (
        <div className="absolute top-20 left-4 z-10 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-card-border">
          <span className="text-sm font-medium text-foreground" data-testid="text-results-counter">
            {filteredSpots.length} Spot{filteredSpots.length !== 1 ? 's' : ''} {filters.status === 'available' ? 'Available' : 'Found'}
          </span>
        </div>
      )}
      
      {/* Map Content Area */}
      <div className="absolute inset-0 pt-24 pb-4">
        {/* Simulated map with parking spots positioned */}
        <div className="relative w-full h-full overflow-hidden rounded-lg border border-border bg-card/30">
          {/* User location indicator */}
          <div 
            className="absolute w-4 h-4 bg-rift rounded-full border-2 border-white shadow-lg z-20 animate-pulse"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
            data-testid="user-location"
          >
            <div className="absolute inset-0 bg-rift rounded-full animate-ping opacity-30" />
          </div>
          
          {/* Parking spot markers */}
          {spots.map((spot, index) => (
            <ParkingSpotMarker
              key={spot.id}
              status={spot.status}
              price={spot.price}
              onClick={() => {
                console.log(`Clicked spot: ${spot.name}`);
                onSpotClick?.(spot);
              }}
              className="absolute z-10 transition-opacity duration-300"
              style={{
                left: `${45 + (index % 3) * 15}%`,
                top: `${40 + Math.floor(index / 3) * 20}%`,
                opacity: getSpotOpacity(spot)
              }}
            />
          ))}
          
          {/* Grid lines for nodal design */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full h-px bg-border"
                style={{ top: `${20 + i * 12}%` }}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute w-px h-full bg-border"
                style={{ left: `${15 + i * 10}%` }}
              />
            ))}
          </div>
          
          {/* Map overlay information */}
          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-card-border">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-savanna rounded-full" />
              <span className="text-savanna font-medium">
                {(filters ? filteredSpots : spots).filter(s => s.status === "available").length} Available
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <div className="w-3 h-3 bg-gold rounded-full" />
              <span className="text-gold font-medium">
                {(filters ? filteredSpots : spots).filter(s => s.status === "reserved").length} Reserved
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <div className="w-3 h-3 bg-destructive rounded-full" />
              <span className="text-destructive font-medium">
                {(filters ? filteredSpots : spots).filter(s => s.status === "occupied").length} Occupied
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}