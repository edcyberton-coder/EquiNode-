import { useState } from "react";
import BottomNavigation from "../BottomNavigation";

export default function BottomNavigationExample() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="relative h-20 bg-background">
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          console.log(`Tab switched to: ${tab}`);
        }} 
      />
    </div>
  );
}