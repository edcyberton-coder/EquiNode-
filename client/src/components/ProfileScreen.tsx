import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, CreditCard, Bell, MapPin, Clock, Star, MessageCircle, Settings, LogOut } from "lucide-react";

interface ParkingHistoryItem {
  id: string;
  spotName: string;
  date: string;
  duration: string;
  cost: number;
  status: "completed" | "cancelled";
}

interface ProfileScreenProps {
  user?: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  parkingHistory?: ParkingHistoryItem[];
  onLogout?: () => void;
}

export default function ProfileScreen({ user, parkingHistory = [], onLogout }: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  
  //todo: remove mock functionality
  const defaultUser = user || {
    name: "John Kariuki",
    email: "john.kariuki@email.com",
    phone: "+254 712 345 678"
  };
  
  const defaultHistory: ParkingHistoryItem[] = parkingHistory.length > 0 ? parkingHistory : [
    { id: "1", spotName: "Westlands Mall", date: "2024-01-15", duration: "2h", cost: 120, status: "completed" },
    { id: "2", spotName: "Upper Hill Plaza", date: "2024-01-14", duration: "4h", cost: 200, status: "completed" },
    { id: "3", spotName: "CBD Parking", date: "2024-01-13", duration: "1h", cost: 60, status: "cancelled" },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* User Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={defaultUser.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                {defaultUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground" data-testid="text-user-name">
                {defaultUser.name}
              </h2>
              <p className="text-muted-foreground">{defaultUser.email}</p>
              <p className="text-muted-foreground">{defaultUser.phone}</p>
            </div>
            <Button size="icon" variant="outline" data-testid="button-edit-profile">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-savanna">{defaultHistory.filter(h => h.status === "completed").length}</div>
            <div className="text-xs text-muted-foreground">Parking Sessions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gold">
              KSh {defaultHistory.filter(h => h.status === "completed").reduce((sum, h) => sum + h.cost, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-rift">
              {defaultHistory.filter(h => h.status === "completed").reduce((sum, h) => sum + parseInt(h.duration), 0)}h
            </div>
            <div className="text-xs text-muted-foreground">Total Hours</div>
          </CardContent>
        </Card>
      </div>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-muted-foreground">Get alerts for reservations</div>
              </div>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
              data-testid="switch-notifications"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Location Sharing</div>
                <div className="text-sm text-muted-foreground">Help find nearby spots</div>
              </div>
            </div>
            <Switch 
              checked={locationSharing} 
              onCheckedChange={setLocationSharing}
              data-testid="switch-location"
            />
          </div>
          
          <Button variant="outline" className="w-full justify-start" data-testid="button-payment-methods">
            <CreditCard className="w-4 h-4 mr-3" />
            Payment Methods
          </Button>
        </CardContent>
      </Card>

      {/* Parking History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Parking History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {defaultHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex-1">
                <div className="font-medium" data-testid={`text-history-spot-${item.id}`}>
                  {item.spotName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.date} • {item.duration}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">KSh {item.cost}</div>
                <Badge 
                  variant={item.status === "completed" ? "secondary" : "destructive"}
                  className="text-xs"
                >
                  {item.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardContent className="p-4">
          <Button variant="outline" className="w-full justify-start" data-testid="button-feedback">
            <MessageCircle className="w-4 h-4 mr-3" />
            Send Feedback
          </Button>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card>
        <CardContent className="p-4">
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/10"
            onClick={() => {
              console.log("Logout pressed");
              onLogout?.();
            }}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}