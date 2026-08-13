import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "@/components/Logo";
import SoftOrbitBackground from "@/components/SoftOrbitBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BETA_ACCOUNTS } from "@/config/betaAccounts";
import { toast } from "sonner";

const BetaLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const account = BETA_ACCOUNTS.find(
        (acc) =>
          acc.email.toLowerCase() === email.toLowerCase() &&
          acc.password === password
      );

      if (account) {
        localStorage.setItem("user_id", account.id);
        localStorage.setItem("betaUser", account.email);
        localStorage.setItem("betaCohort", password);
        localStorage.setItem("betaRole", account.role || "");
        localStorage.setItem("betaIsAdmin", account.is_admin ? "true" : "false");

        toast.success("Login successful!");
        navigate("/beta-dashboard");
      } else {
        toast.error("Invalid beta credentials.");
      }

      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white p-6 text-foreground">
      <SoftOrbitBackground />

      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="text-center">
            <h1 className="mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-bold text-transparent">
              Beta Access
            </h1>

            <p className="text-muted-foreground">
              Login with your beta credentials
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-6 rounded-xl border border-border/50 bg-card/95 p-8 shadow-elegant backdrop-blur"
          >
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
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="h-12 w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate("/waitlist")}
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
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaLogin;
