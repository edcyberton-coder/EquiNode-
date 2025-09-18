import SearchBar from "../SearchBar";

export default function SearchBarExample() {
  return (
    <div className="relative h-32 bg-gradient-to-b from-primary/20 to-background">
      <SearchBar 
        onSearch={(query) => console.log(`Searching for: ${query}`)}
        onLocationPress={() => console.log("Location button pressed")}
      />
    </div>
  );
}