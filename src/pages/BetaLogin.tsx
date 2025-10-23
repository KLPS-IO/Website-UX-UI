import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Logo from "@/components/Logo";

const BETA_ACCOUNTS = [
  { email: "emmamendez07@gmail.com", password: "SheBuildsBeta1.0" },
  { email: "muneeb@docwyn.com", password: "SheBuildsBeta1.0" },
  { email: "oyin@niyo.co", password: "SheBuildsBeta1.0" },
];

const BetaLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      const account = BETA_ACCOUNTS.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (account) {
        localStorage.setItem("betaUser", email);
        toast.success("Login successful!");
        navigate("/beta-dashboard");
      } else {
        toast.error("Invalid beta credentials.");
      }
      setIsLoading(false);
    }, 500);
  };

  const handleRequestAccess = () => {
    toast.info("Request access feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Beta Access
          </h1>
          <p className="text-muted-foreground">
            Login with your beta credentials
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-card p-8 rounded-xl shadow-elegant border border-border/50">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={handleRequestAccess}
              className="text-sm"
            >
              Request Access
            </Button>
          </div>
        </form>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-sm"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BetaLogin;
