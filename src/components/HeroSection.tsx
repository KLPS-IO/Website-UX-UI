import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  

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
          Join our waitlist to be part of something extraordinary.
        </p>

        <div className="mb-8">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => window.location.href = '/beta-login'}
            className="whitespace-nowrap"          >
            Login for Beta Users
          </Button>
        </div>

        <div className="mb-8">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => window.open('https://form.typeform.com/to/P1ZOHV7k', '_blank')}
          >
            Join Waitlist
          </Button>
        </div>

        <div className="mb-8">
          <Button
            size="lg"
            onClick={() => window.location.href = '/innovation-lab'}
            className="whitespace-nowrap bg-[#d8bd57] text-[#211b08] shadow-[0_14px_35px_-18px_rgba(216,189,87,0.85)] hover:bg-[#e0c96d]"          >
            Enter the Innovation Lab
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Be the first to know when we launch. No spam, ever.
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-[5]"></div>
    </section>
  );
};

export default HeroSection;
