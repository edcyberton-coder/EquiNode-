import Header from "../Header";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function HeaderExample() {
  return (
    <div className="bg-background">
      <Header
        title="EquiNode"
        notificationCount={3}
        onMenuPress={() => console.log("Menu pressed")}
        onNotificationPress={() => console.log("Notifications pressed")}
        onProfilePress={() => console.log("Profile pressed")}
        rightElement={
          <Button size="icon" variant="ghost">
            <Search className="w-4 h-4" />
          </Button>
        }
      />
    </div>
  );
}