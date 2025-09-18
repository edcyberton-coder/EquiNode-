import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, DollarSign, Navigation, X, Calendar } from "lucide-react";

interface Reservation {
  id: string;
  spotName: string;
  address: string;
  startTime: string;
  endTime: string;
  duration: string;
  cost: number;
  status: "active" | "upcoming" | "completed" | "cancelled";
  qrCode?: string;
}

export default function Reservations() {
  //todo: remove mock functionality
  const [reservations] = useState<Reservation[]>([
    {
      id: "1",
      spotName: "Westlands Mall",
      address: "Waiyaki Way, Westlands",
      startTime: "14:00",
      endTime: "16:00",
      duration: "2h",
      cost: 120,
      status: "active",
      qrCode: "QR123456"
    },
    {
      id: "2",
      spotName: "Upper Hill Plaza",
      address: "Ralph Bunche Rd, Upper Hill",
      startTime: "09:00",
      endTime: "17:00",
      duration: "8h",
      cost: 320,
      status: "upcoming"
    },
    {
      id: "3",
      spotName: "CBD Parking",
      address: "Kenyatta Ave, CBD",
      startTime: "12:00",
      endTime: "14:00",
      duration: "2h",
      cost: 80,
      status: "completed"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-savanna text-savanna-foreground";
      case "upcoming":
        return "bg-gold text-gold-foreground";
      case "completed":
        return "bg-secondary text-secondary-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
    <Card className="hover-elevate">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground" data-testid={`text-reservation-${reservation.id}`}>
              {reservation.spotName}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{reservation.address}</p>
            </div>
          </div>
          <Badge className={getStatusColor(reservation.status)}>
            {reservation.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{reservation.startTime} - {reservation.endTime}</div>
              <div className="text-xs text-muted-foreground">{reservation.duration}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">KSh {reservation.cost}</div>
              <div className="text-xs text-muted-foreground">Total cost</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            data-testid={`button-navigate-${reservation.id}`}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Navigate
          </Button>
          
          {reservation.status === "active" && (
            <Button
              size="sm"
              className="flex-1 bg-gold hover:bg-gold/90 text-gold-foreground"
              data-testid={`button-extend-${reservation.id}`}
            >
              <Clock className="w-4 h-4 mr-2" />
              Extend
            </Button>
          )}
          
          {reservation.status === "upcoming" && (
            <Button
              variant="destructive"
              size="sm"
              className="flex-1"
              data-testid={`button-cancel-${reservation.id}`}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const activeReservations = reservations.filter(r => r.status === "active");
  const upcomingReservations = reservations.filter(r => r.status === "upcoming");
  const pastReservations = reservations.filter(r => ["completed", "cancelled"].includes(r.status));

  return (
    <div className="space-y-6 pb-24">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" data-testid="tab-active">
            Active ({activeReservations.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" data-testid="tab-upcoming">
            Upcoming ({upcomingReservations.length})
          </TabsTrigger>
          <TabsTrigger value="history" data-testid="tab-history">
            History ({pastReservations.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-6">
          {activeReservations.length > 0 ? (
            activeReservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Reservations</h3>
                <p className="text-muted-foreground">You don't have any active parking reservations.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingReservations.length > 0 ? (
            upcomingReservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Upcoming Reservations</h3>
                <p className="text-muted-foreground">You don't have any upcoming parking reservations.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4 mt-6">
          {pastReservations.length > 0 ? (
            pastReservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Reservation History</h3>
                <p className="text-muted-foreground">Your past reservations will appear here.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}