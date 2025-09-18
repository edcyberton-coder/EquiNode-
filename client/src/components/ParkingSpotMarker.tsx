import { cn } from "@/lib/utils";

interface ParkingSpotMarkerProps {
  status: "available" | "reserved" | "occupied";
  price?: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const statusConfig = {
  available: {
    color: "bg-savanna",
    pulse: true,
    label: "Available"
  },
  reserved: {
    color: "bg-gold",
    pulse: false,
    label: "Reserved"
  },
  occupied: {
    color: "bg-destructive",
    pulse: false,
    label: "Occupied"
  }
};

export default function ParkingSpotMarker({ 
  status, 
  price, 
  onClick,
  className,
  style 
}: ParkingSpotMarkerProps) {
  const config = statusConfig[status];
  
  return (
    <button
      onClick={onClick}
      style={style}
      className={cn(
        "relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-card shadow-lg transition-transform hover:scale-110 active:scale-95",
        config.color,
        config.pulse && "animate-pulse",
        className
      )}
      data-testid={`marker-${status}`}
    >
      {/* Nodal design - inner circle */}
      <div className="w-3 h-3 bg-white rounded-full opacity-90" />
      
      {/* Price display for available spots */}
      {status === "available" && price && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card px-2 py-1 rounded-md border border-card-border shadow-sm">
          <span className="text-xs font-medium text-foreground">
            KSh {price}
          </span>
        </div>
      )}
      
      {/* Connection lines for nodal effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-full w-4 h-px bg-border opacity-30" />
        <div className="absolute top-full left-1/2 w-px h-4 bg-border opacity-30" />
      </div>
    </button>
  );
}