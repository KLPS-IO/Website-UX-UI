import { Suspense, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import CoverVideo from "@/components/CoverVideo";
import Logo from "@/components/Logo";
import HeroSection from "@/components/HeroSection";
import ValueProps from "@/components/ValueProps";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Logo />
        <CoverVideo />
      </Suspense>
      <HeroSection />
      <ValueProps />
      <Footer />
    </div>
  );
};

export default Index;
