import { Link } from "react-router-dom";

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
            <p className="text-sm text-muted-foreground italic font-bold">
              Female? You Matter!
            </p>
          </div>

          <div aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              to="/privacy"
              className="rounded-sm text-sm font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="rounded-sm text-sm font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              Terms of Service
            </Link>
          </div>
        </div>
 
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} All rights reserved. Made with &hearts; by KLPS Ltd.&nbsp; 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
