import { Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              FemTech Innovation
            </h3>
            <p className="text-sm text-muted-foreground">
              Transforming women's health, one innovation at a time.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="mailto:hello@femtech.com" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Contact Us</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Made with &hearts; by &nbsp; 
            <a
              href="https://klps.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              KLPS.
            </a> All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
