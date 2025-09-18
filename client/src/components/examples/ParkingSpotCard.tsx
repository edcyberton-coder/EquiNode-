import ParkingSpotCard from "../ParkingSpotCard";

export default function ParkingSpotCardExample() {
  //todo: remove mock functionality
  const mockSpot = {
    id: "spot-1",
    name: "Westlands Mall Parking", 
    address: "Waiyaki Way, Westlands",
    distance: 0.3,
    price: 80,
    duration: "2 hours",
    amenities: ["Covered", "Security", "EV Charging"]
  };

  return (
    <div className="p-4 bg-background">
      <ParkingSpotCard 
        {...mockSpot}
        onReserve={(id) => console.log(`Reserve spot: ${id}`)}
        onNavigate={(id) => console.log(`Navigate to spot: ${id}`)}
      />
    </div>
  );
}