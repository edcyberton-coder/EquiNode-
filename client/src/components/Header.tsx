import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
}

export default function Header({
  title,
  onMenuPress
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={onMenuPress}
            data-testid="button-breadcrumb"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-gold" data-testid="text-header-title">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
}