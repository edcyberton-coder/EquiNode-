import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Reservations from "@/pages/Reservations";
import Profile from "@/pages/Profile";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/reservations" component={Reservations} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("home");
  
  const getPageTitle = () => {
    switch (activeTab) {
      case "home":
        return "EquiNode";
      case "reservations":
        return "My Reservations";
      case "profile":
        return "Profile";
      case "settings":
        return "Settings";
      default:
        return "EquiNode";
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Handle navigation based on tab
    switch (tab) {
      case "home":
        window.location.pathname = "/";
        break;
      case "reservations":
        window.location.pathname = "/reservations";
        break;
      case "profile":
        window.location.pathname = "/profile";
        break;
      case "settings":
        console.log("Settings tab - could open settings page");
        break;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col h-screen bg-background text-foreground">
          {/* Header */}
          <Header
            title={getPageTitle()}
            notificationCount={2}
            onMenuPress={() => console.log("Menu pressed")}
            onNotificationPress={() => console.log("Notifications pressed")}
            onProfilePress={() => setActiveTab("profile")}
            rightElement={<ThemeToggle />}
          />
          
          {/* Main Content */}
          <main className="flex-1 overflow-hidden relative">
            <Router />
          </main>
          
          {/* Bottom Navigation */}
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;