import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-femtech.jpg";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "You're on the list! 🎉",
        description: "We'll be in touch soon with early access.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              Coming Soon
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Redefining Women's Health
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            We're building something transformative for women's wellness. 
            Join the waitlist to be among the first to experience the future of femtech.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-4 bg-card/80 backdrop-blur-sm border-primary/20 focus-visible:ring-primary"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              variant="hero" 
              size="lg"
              disabled={isSubmitting}
              className="group"
            >
              {isSubmitting ? "Joining..." : "Get Early Access"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
