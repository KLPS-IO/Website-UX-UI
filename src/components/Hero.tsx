import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-femtech.jpg";

/**
 * Local lightweight fallback Button and Input components used when
 * the project's shared UI module ('@/components/ui') is not available.
 * Replace these with your real components or restore the original import
 * once the module and its types are present.
 */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
  size?: string;
  className?: string;
  children?: React.ReactNode;
};
const Button = ({ children, className = "", ...props }: ButtonProps) => {
  const base = "inline-flex items-center justify-center rounded-md";
  const sizeClasses = props.size === "lg" ? "px-5 py-3 text-base" : "px-3 py-2 text-sm";
  const variantClasses = props.variant === "hero" ? "bg-primary text-white" : "bg-gray-200 text-black";
  return (
    <button {...props} className={`${base} ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { className?: string };
const Input = ({ className = "", ...props }: InputProps) => {
  return <input {...props} className={`w-full rounded-md border px-3 py-2 bg-white/80 ${className}`} />;
};

const toast = (opts: {
  title: string;
  description?: string;
  variant?: "default" | "destructive" | string;
}) => {
  // Lightweight fallback toast used when the project's toast hook isn't available.
  // For destructive variants we show a blocking alert so the user notices the problem.
  if (typeof window === "undefined") return;

  const message = `${opts.title}${opts.description ? "\n\n" + opts.description : ""}`;

  if (opts.variant === "destructive") {
    window.alert(message);
    return;
  }

  // Non-blocking visual toast: append a temporary DOM node.
  console.log("Toast:", opts.title, opts.description ?? "");
  const el = document.createElement("div");
  el.textContent = `${opts.title}${opts.description ? " — " + opts.description : ""}`;
  el.style.position = "fixed";
  el.style.right = "20px";
  el.style.bottom = "20px";
  el.style.background = "rgba(0,0,0,0.85)";
  el.style.color = "white";
  el.style.padding = "10px 14px";
  el.style.borderRadius = "8px";
  el.style.zIndex = "9999";
  el.style.boxShadow = "0 4px 14px rgba(0,0,0,0.25)";
  document.body.appendChild(el);
  setTimeout(() => {
    if (el.parentElement) el.parentElement.removeChild(el);
  }, 3000);
};

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
