import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.webp";
const textVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: -5,
    transition: {
      duration: 2,
      delay: 0.2,
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
      delay: 0.2,
    },
  },
};

const Logo = () => {
  return (
    <div className="absolute top-4 left-0 w-full text-foreground z-[5]">
      <Link to="/" className="flex items-end">
        <motion.div
          initial={{ y: -10, opacity: 0   }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
          className="fixed top-4 left-4 w-full text-foreground z-[5]"
        />
        <motion.img
          src={logo}
          alt="KLPS Logo"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          className="w-32 h-auto md:w-100 lg:w-32"
        />
        {/* <motion.span
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl text-foreground pb-2"
        >
          KLPS
        </motion.span> */}
      </Link>
    </div>
  );
};

export default Logo;
