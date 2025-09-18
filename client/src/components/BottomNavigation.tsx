import { MapPin, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "Home", icon: MapPin },
  { id: "reservations", label: "Reservations", icon: Clock },
  { id: "profile", label: "Profile", icon: User },
];

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-20 px-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors min-w-0 flex-1 hover-elevate",
              activeTab === id ? "text-primary" : "text-muted-foreground"
            )}
            data-testid={`tab-${id}`}
          >
            <Icon 
              className={cn(
                "w-6 h-6 transition-colors",
                activeTab === id ? "text-primary" : "text-muted-foreground"
              )} 
            />
            <span className="text-xs font-medium truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}