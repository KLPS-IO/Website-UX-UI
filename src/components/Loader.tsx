import { motion } from "framer-motion";
import logo from "@/assets/logo.webp";

const textVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
    },
  },
};

const Loader = () => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground touch-none overflow-hidden"
    >
      <motion.img
        src={logo}
        alt="KLPS Logo"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        className="w-100 h-auto md:w-100 lg:w-100"        
        />
      <motion.span
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="md:text-6xl text-foreground"
      >
        KLPS
      </motion.span>
    </motion.div>
  );
};

export default Loader;
