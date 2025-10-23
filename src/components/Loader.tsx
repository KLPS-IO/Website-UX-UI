import { motion } from "framer-motion";
import logo from "@/assets/logo.webp";

const Loader = () => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground touch-none overflow-hidden"
    >
      <motion.img
        src={logo}
        alt="KLPS Logo"
        initial={{ opacity: 0.7, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.2 }}
        transition={{
          duration: 1.8,       // speed of each beat
          repeat: Infinity,    // keeps looping
          repeatType: "reverse",
          ease: "easeInOut",   // smooth pulse
        }}
        className="w-100 h-auto md:w-100 lg:w-100 pt-9"
      />
    </motion.div>
  );
};

export default Loader;
