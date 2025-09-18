import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onLocationPress?: () => void;
}

export default function SearchBar({ 
  placeholder = "Search for parking spots...", 
  onSearch,
  onLocationPress 
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 bg-card/95 backdrop-blur-sm border-card-border shadow-lg"
            data-testid="input-search"
          />
        </div>
        <Button 
          type="button"
          size="icon"
          variant="secondary"
          onClick={onLocationPress}
          className="bg-card/95 backdrop-blur-sm shadow-lg"
          data-testid="button-location"
        >
          <MapPin className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}