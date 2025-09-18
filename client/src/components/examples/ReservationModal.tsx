import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReservationModal from "../ReservationModal";

export default function ReservationModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  //todo: remove mock functionality
  const mockSpot = {
    id: "spot-1",
    name: "Westlands Mall Parking",
    address: "Waiyaki Way, Westlands",
    distance: 0.3,
    basePrice: 80,
    amenities: ["Covered", "Security", "EV Charging"]
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-modal">
        Open Reservation Modal
      </Button>
      
      <ReservationModal
        spot={mockSpot}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={(spot, duration, paymentMethod) => {
          console.log(`Reserved ${spot.name} for ${duration}h via ${paymentMethod}`);
          setIsOpen(false);
        }}
      />
    </div>
  );
}