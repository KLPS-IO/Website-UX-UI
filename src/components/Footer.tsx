import { Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold gradient-primary bg-clip-text text-transparent mb-2">
                FemTech Innovation
              </h3>
              <p className="text-sm text-muted-foreground">
                Building the future of women's health
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <a 
                href="mailto:hello@femtech.com" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth group"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-smooth" />
                hello@femtech.com
              </a>
              <p className="text-xs text-muted-foreground">
                © {currentYear} FemTech Innovation. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
