import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export const DashboardLayout = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const betaUser = localStorage.getItem("betaUser");
    if (!betaUser) {
      navigate("/beta-login");
    } else {
      setUserEmail(betaUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("betaUser");
    localStorage.removeItem("user_id");
    localStorage.removeItem("betaCohort");
    localStorage.removeItem("betaRole");
    localStorage.removeItem("betaIsAdmin");
    navigate("/");
  };

  if (!userEmail) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/50 flex items-center justify-between px-6">
            <SidebarTrigger />
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{userEmail}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
