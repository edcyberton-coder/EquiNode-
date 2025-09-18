import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Settings, X, Moon, Sun } from "lucide-react";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  notificationCount?: number;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  onSettingsPress?: () => void;
}

export default function AppSidebar({ 
  isOpen, 
  onClose, 
  notificationCount = 0,
  onProfilePress,
  onNotificationPress,
  onSettingsPress 
}: AppSidebarProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Theme toggle functionality
  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    console.log(`Theme switched to: ${newTheme}`);
  };

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      onClick: () => {
        onProfilePress?.();
        onClose();
      },
      badge: null
    },
    {
      id: "notifications", 
      label: "Notifications",
      icon: Bell,
      onClick: () => {
        onNotificationPress?.();
        onClose();
      },
      badge: notificationCount > 0 ? (notificationCount > 9 ? "9+" : notificationCount.toString()) : null
    },
    {
      id: "theme",
      label: "Theme",
      icon: theme === "light" ? Moon : Sun,
      onClick: toggleTheme,
      badge: null,
      subtitle: theme === "light" ? "Switch to Dark" : "Switch to Light"
    },
    {
      id: "settings",
      label: "Settings", 
      icon: Settings,
      onClick: () => {
        onSettingsPress?.();
        onClose();
      },
      badge: null
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-80">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold text-gold">EquiNode</SheetTitle>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-sidebar"
          >
            <X className="w-5 h-5" />
          </Button>
        </SheetHeader>

        <div className="flex flex-col mt-8">
          {menuItems.map((item, index) => (
            <div key={item.id}>
              <Button
                variant="ghost"
                onClick={item.onClick}
                className="w-full justify-start h-14 px-4 hover-elevate"
                data-testid={`sidebar-${item.id}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.subtitle && (
                        <span className="text-xs text-muted-foreground">{item.subtitle}</span>
                      )}
                    </div>
                  </div>
                  
                  {item.badge && (
                    <Badge className="ml-auto bg-destructive text-destructive-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Button>
              
              {index < menuItems.length - 1 && (
                <Separator className="my-2" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Smart Parking Solution</p>
            <p className="text-xs text-muted-foreground">for Urban Drivers in Nairobi</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}