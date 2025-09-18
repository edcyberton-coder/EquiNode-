import { Button } from "@/components/ui/button";
import { Menu, Bell, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  rightElement?: React.ReactNode;
}

export default function Header({
  title,
  showNotifications = true,
  notificationCount = 0,
  onMenuPress,
  onNotificationPress,
  onProfilePress,
  rightElement
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={onMenuPress}
            className="lg:hidden"
            data-testid="button-menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground" data-testid="text-header-title">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {rightElement}
          
          {showNotifications && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onNotificationPress}
              className="relative"
              data-testid="button-notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Badge>
              )}
            </Button>
          )}
          
          <Button
            size="icon"
            variant="ghost"
            onClick={onProfilePress}
            data-testid="button-profile"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}