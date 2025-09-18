import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { MapPin, Clock, DollarSign, CreditCard, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  distance: number;
  basePrice: number;
  amenities: string[];
}

interface ReservationModalProps {
  spot: ParkingSpot | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (spot: ParkingSpot, duration: number, paymentMethod: string) => void;
}

export default function ReservationModal({ spot, isOpen, onClose, onConfirm }: ReservationModalProps) {
  const [duration, setDuration] = useState([2]); // hours
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  
  if (!spot) return null;
  
  // Dynamic pricing calculation
  const basePricePerHour = spot.basePrice;
  const peakMultiplier = new Date().getHours() >= 8 && new Date().getHours() <= 18 ? 1.5 : 1;
  const durationMultiplier = duration[0] > 4 ? 0.9 : 1; // Discount for longer stays
  const finalPrice = Math.round(basePricePerHour * duration[0] * peakMultiplier * durationMultiplier);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-left">Reserve Parking Spot</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Spot Details */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground" data-testid="text-spot-name">
                {spot.name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{spot.address}</p>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(spot.distance * 4)} min walk ({spot.distance.toFixed(1)}km)
                </p>
              </div>
              
              {spot.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {spot.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Duration Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Duration: {duration[0]} hour{duration[0] !== 1 ? 's' : ''}
            </label>
            <Slider
              value={duration}
              onValueChange={setDuration}
              max={8}
              min={1}
              step={1}
              className="w-full"
              data-testid="slider-duration"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 hour</span>
              <span>8 hours</span>
            </div>
          </div>
          
          {/* Dynamic Pricing */}
          <Card className="bg-gold/10 border-gold/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                  <div className="text-2xl font-bold text-gold" data-testid="text-total-price">
                    KSh {finalPrice}
                  </div>
                  {peakMultiplier > 1 && (
                    <Badge variant="secondary" className="text-xs mt-1 bg-gold/20 text-gold">
                      Peak Hours +50%
                    </Badge>
                  )}
                  {durationMultiplier < 1 && (
                    <Badge variant="secondary" className="text-xs mt-1 bg-savanna/20 text-savanna">
                      Long Stay -10%
                    </Badge>
                  )}
                </div>
                <DollarSign className="w-8 h-8 text-gold" />
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Method */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={paymentMethod === "mpesa" ? "default" : "outline"}
                onClick={() => setPaymentMethod("mpesa")}
                className={cn(
                  "h-auto p-3 flex flex-col gap-2",
                  paymentMethod === "mpesa" && "bg-savanna hover:bg-savanna/90"
                )}
                data-testid="button-mpesa"
              >
                <Smartphone className="w-5 h-5" />
                <span className="text-xs">M-Pesa</span>
              </Button>
              <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className="h-auto p-3 flex flex-col gap-2"
                data-testid="button-card"
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs">Card</span>
              </Button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                console.log(`Confirming reservation: ${spot.name}, ${duration[0]}h, ${paymentMethod}`);
                onConfirm?.(spot, duration[0], paymentMethod);
              }}
              className="flex-1 bg-gold hover:bg-gold/90 text-gold-foreground"
              data-testid="button-confirm"
            >
              Confirm Reservation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}