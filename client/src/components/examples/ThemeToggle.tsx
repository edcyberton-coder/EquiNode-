import ThemeToggle from "../ThemeToggle";

export default function ThemeToggleExample() {
  return (
    <div className="p-4 bg-background">
      <div className="flex items-center gap-2">
        <span className="text-foreground">Toggle theme:</span>
        <ThemeToggle />
      </div>
    </div>
  );
}