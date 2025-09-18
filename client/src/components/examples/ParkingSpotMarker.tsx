import ParkingSpotMarker from "../ParkingSpotMarker";

export default function ParkingSpotMarkerExample() {
  return (
    <div className="flex items-center gap-8 p-8 bg-muted/20">
      <div className="flex flex-col items-center gap-2">
        <ParkingSpotMarker 
          status="available" 
          price={50}
          onClick={() => console.log("Available spot clicked")}
        />
        <span className="text-xs text-muted-foreground">Available</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <ParkingSpotMarker 
          status="reserved"
          onClick={() => console.log("Reserved spot clicked")}
        />
        <span className="text-xs text-muted-foreground">Reserved</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <ParkingSpotMarker 
          status="occupied"
          onClick={() => console.log("Occupied spot clicked")}
        />
        <span className="text-xs text-muted-foreground">Occupied</span>
      </div>
    </div>
  );
}