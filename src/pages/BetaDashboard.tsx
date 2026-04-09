import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { DashboardPage } from "@/components/DashboardPage";
import { StatsPage } from "@/components/StatsPage";

const BetaDashboard = () => {
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
    navigate("/");
  };

  if (!userEmail) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Beta Access Active
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Welcome to Beta
          </h1>

          <div className="bg-card p-8 rounded-xl shadow-elegant border border-border/50">
            <p className="text-xl text-muted-foreground mb-4">
              Welcome, <span className="text-foreground font-semibold">{userEmail}</span>
            </p>
            <p className="text-lg text-muted-foreground">
              You have beta access
            </p>
          </div>
          <StatsPage />
        </div>
      </div>
    </div>
  );
};

export default BetaDashboard;
