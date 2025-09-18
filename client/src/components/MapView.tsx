import { useState } from "react";
import ParkingSpotMarker from "./ParkingSpotMarker";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { MapPin, Filter } from "lucide-react";

interface ParkingSpot {
  id: string;
  lat: number;
  lng: number;
  status: "available" | "reserved" | "occupied";
  price?: number;
  name: string;
}

interface MapViewProps {
  spots: ParkingSpot[];
  onSpotClick?: (spot: ParkingSpot) => void;
  onSearch?: (query: string) => void;
  onLocationPress?: () => void;
  onFilterPress?: () => void;
}

export default function MapView({ 
  spots, 
  onSpotClick, 
  onSearch, 
  onLocationPress,
  onFilterPress 
}: MapViewProps) {
  const [userLocation, setUserLocation] = useState({ lat: -1.286389, lng: 36.817223 }); // Nairobi center

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-primary/5 via-background to-savanna/5">
      {/* Search Bar */}
      <SearchBar 
        onSearch={onSearch}
        onLocationPress={() => {
          console.log("Getting current location...");
          onLocationPress?.();
        }}
      />
      
      {/* Filter Button */}
      <Button
        size="icon"
        variant="secondary"
        onClick={onFilterPress}
        className="absolute top-20 right-4 z-10 bg-card/95 backdrop-blur-sm shadow-lg"
        data-testid="button-filter"
      >
        <Filter className="w-4 h-4" />
      </Button>
      
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
              className="absolute z-10"
              style={{
                left: `${45 + (index % 3) * 15}%`,
                top: `${40 + Math.floor(index / 3) * 20}%`
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
              <span className="text-savanna font-medium">{spots.filter(s => s.status === "available").length} Available</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <div className="w-3 h-3 bg-gold rounded-full" />
              <span className="text-gold font-medium">{spots.filter(s => s.status === "reserved").length} Reserved</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <div className="w-3 h-3 bg-destructive rounded-full" />
              <span className="text-destructive font-medium">{spots.filter(s => s.status === "occupied").length} Occupied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}