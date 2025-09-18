import { MapPin, Clock, DollarSign, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ParkingSpotCardProps {
  id: string;
  name: string;
  address: string;
  distance: number;
  price: number;
  duration: string;
  amenities: string[];
  onReserve?: (id: string) => void;
  onNavigate?: (id: string) => void;
}

export default function ParkingSpotCard({
  id,
  name,
  address,
  distance,
  price,
  duration,
  amenities,
  onReserve,
  onNavigate
}: ParkingSpotCardProps) {
  return (
    <Card className="hover-elevate">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate" data-testid={`text-spot-name-${id}`}>
              {name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground truncate">{address}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-gold" data-testid={`text-price-${id}`}>
              KSh {price}
            </div>
            <div className="text-xs text-muted-foreground">{duration}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Navigation className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`} away
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {Math.round(distance * 4)} min walk
            </span>
          </div>
        </div>
        
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigate?.(id)}
            className="flex-1"
            data-testid={`button-navigate-${id}`}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Navigate
          </Button>
          <Button 
            size="sm"
            onClick={() => onReserve?.(id)}
            className="flex-1 bg-gold hover:bg-gold/90 text-gold-foreground"
            data-testid={`button-reserve-${id}`}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Reserve
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}