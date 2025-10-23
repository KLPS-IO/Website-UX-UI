import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list! We'll be in touch soon.");
      setEmail("");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Innovative femtech solutions" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 gradient-accent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-block mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Coming Soon
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
          Redefining Women's Health
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          A revolutionary approach to femtech that puts you first. 
          {/* Join our waitlist to be part of something extraordinary. */}
        </p>
        <div className="mb-8">
          <Button
            onClick={() => window.location.href = '/beta-login'}
            variant="hero"
            size="lg"
            className="whitespace-nowrap"
          >
            Login for Beta Users
          </Button>
        </div>
{/* 
        <form onSubmit={handleJoinWaitlist} className="max-w-md mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 px-6 shadow-soft"
            />
            <Button type="submit" variant="hero" size="lg" className="whitespace-nowrap">
              Join Waitlist
            </Button>
          </div>
        </form>

        <p className="text-sm text-muted-foreground">
          Be the first to know when we launch. No spam, ever.
        </p> */}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-[5]"></div>
    </section>
  );
};

export default HeroSection;
