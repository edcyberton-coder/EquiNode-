import MapView from "../MapView";

export default function MapViewExample() {
  //todo: remove mock functionality
  const mockSpots = [
    { id: "1", lat: -1.2841, lng: 36.8155, status: "available" as const, price: 50, name: "Westlands Mall", distance: 0.3, address: "Waiyaki Way", amenities: ["Covered"] },
    { id: "2", lat: -1.2921, lng: 36.8219, status: "reserved" as const, price: 80, name: "Upper Hill Plaza", distance: 0.7, address: "Ralph Bunche Rd", amenities: ["Security"] },
    { id: "3", lat: -1.2864, lng: 36.8172, status: "occupied" as const, name: "Sarit Centre", distance: 0.5, address: "Karuna Rd", amenities: ["Shopping"] },
    { id: "4", lat: -1.2798, lng: 36.8089, status: "available" as const, price: 60, name: "Junction Mall", distance: 1.2, address: "Ngong Rd", amenities: ["Mall"] },
    { id: "5", lat: -1.2889, lng: 36.8234, status: "available" as const, price: 40, name: "CBD Parking", distance: 0.8, address: "Kenyatta Ave", amenities: ["Affordable"] },
    { id: "6", lat: -1.2743, lng: 36.8096, status: "occupied" as const, name: "Yaya Centre", distance: 0.9, address: "Argwings Kodhek Rd", amenities: ["Shopping"] }
  ];

  return (
    <div className="h-96 bg-background">
      <MapView 
        spots={mockSpots}
        onSpotClick={(spot) => console.log(`Selected spot: ${spot.name}`)}
        onSearch={(query) => console.log(`Searching: ${query}`)}
        onLocationPress={() => console.log("Location pressed")}
        onFilterPress={() => console.log("Filter pressed")}
        filters={{ status: "available", priceRange: [0, 100], distance: 2 }}
        activeFilterCount={2}
      />
    </div>
  );
}