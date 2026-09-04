import { Suspense } from "react";
import CoverVideo from "@/components/CoverVideo";
import Logo from "@/components/Logo";
import HeroSection from "@/components/HeroSection";
import ValueProps from "@/components/ValueProps";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
