import { useState } from "react";
import MapView from "@/components/MapView";
import ParkingSpotCard from "@/components/ParkingSpotCard";
import ReservationModal from "@/components/ReservationModal";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface ParkingSpot {
  id: string;
  lat: number;
  lng: number;
  status: "available" | "reserved" | "occupied";
  price?: number;
  name: string;
  address: string;
  distance: number;
  amenities: string[];
}

export default function Home() {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [showSpotDetails, setShowSpotDetails] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  
  //todo: remove mock functionality
  const parkingSpots: ParkingSpot[] = [
    {
      id: "1",
      lat: -1.2841,
      lng: 36.8155,
      status: "available",
      price: 50,
      name: "Westlands Mall Parking",
      address: "Waiyaki Way, Westlands",
      distance: 0.3,
      amenities: ["Covered", "Security", "24/7"]
    },
    {
      id: "2",
      lat: -1.2921,
      lng: 36.8219,
      status: "reserved",
      price: 80,
      name: "Upper Hill Plaza",
      address: "Ralph Bunche Rd, Upper Hill",
      distance: 0.7,
      amenities: ["Covered", "EV Charging", "Valet"]
    },
    {
      id: "3",
      lat: -1.2864,
      lng: 36.8172,
      status: "occupied",
      name: "Sarit Centre",
      address: "Karuna Rd, Westlands",
      distance: 0.5,
      amenities: ["Covered", "Security"]
    },
    {
      id: "4",
      lat: -1.2798,
      lng: 36.8089,
      status: "available",
      price: 60,
      name: "Junction Mall",
      address: "Ngong Rd, Nairobi",
      distance: 1.2,
      amenities: ["Covered", "Security", "Shopping"]
    },
    {
      id: "5",
      lat: -1.2889,
      lng: 36.8234,
      status: "available",
      price: 40,
      name: "CBD Parking",
      address: "Kenyatta Ave, CBD",
      distance: 0.8,
      amenities: ["Open Air", "Affordable"]
    },
    {
      id: "6",
      lat: -1.2743,
      lng: 36.8096,
      status: "occupied",
      name: "Yaya Centre",
      address: "Argwings Kodhek Rd, Kilimani",
      distance: 0.9,
      amenities: ["Covered", "Security", "Shopping"]
    }
  ];

  const handleSpotClick = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setShowSpotDetails(true);
  };

  const handleReserveClick = (spotId: string) => {
    const spot = parkingSpots.find(s => s.id === spotId);
    if (spot) {
      setSelectedSpot(spot);
      setShowSpotDetails(false);
      setShowReservationModal(true);
    }
  };


  return (
    <div className="relative h-full">
      <MapView
        spots={parkingSpots}
        onSpotClick={handleSpotClick}
        onSearch={(query) => console.log(`Search: ${query}`)}
        onLocationPress={() => console.log("Getting current location...")}
        onFilterPress={() => console.log("Opening filters...")}
      />
      
      {/* Quick Reserve Button */}
      <Button
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-gold hover:bg-gold/90 text-gold-foreground shadow-lg px-8"
        data-testid="button-reserve-now"
      >
        Reserve Now
      </Button>
      
      {/* Spot Details Sheet */}
      <Sheet open={showSpotDetails} onOpenChange={setShowSpotDetails}>
        <SheetContent side="bottom" className="h-[60vh]">
          <SheetHeader>
            <SheetTitle>Parking Spot Details</SheetTitle>
          </SheetHeader>
          {selectedSpot && (
            <div className="mt-4">
              <ParkingSpotCard
                id={selectedSpot.id}
                name={selectedSpot.name}
                address={selectedSpot.address}
                distance={selectedSpot.distance}
                price={selectedSpot.price || 0}
                duration="per hour"
                amenities={selectedSpot.amenities}
                onReserve={handleReserveClick}
                onNavigate={(id) => console.log(`Navigate to: ${id}`)}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
      
      {/* Reservation Modal */}
      <ReservationModal
        spot={selectedSpot ? {
          id: selectedSpot.id,
          name: selectedSpot.name,
          address: selectedSpot.address,
          distance: selectedSpot.distance,
          basePrice: selectedSpot.price || 0,
          amenities: selectedSpot.amenities
        } : null}
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        onConfirm={(spot, duration, paymentMethod) => {
          console.log(`Reservation confirmed for ${spot.name}, ${duration}h via ${paymentMethod}`);
          setShowReservationModal(false);
          setSelectedSpot(null);
        }}
      />
    </div>
  );
}