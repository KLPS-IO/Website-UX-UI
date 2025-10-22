import { motion } from "framer-motion";
import walkingVideo from "../assets/walking-girl.mp4";

const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 5,
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const CoverVideo = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        className="w-full h-screen object-cover object-center md:object-center"
        autoPlay
        muted
        loop
      >
        <source src={walkingVideo} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-background/60 z-[1]" />
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-foreground"
      >
        <div className="flex flex-row">
          <motion.h1
            variants={item}
            className="text-[clamp(5rem,15vw,10rem)] font-['Kaushan Script'] drop-shadow-md"
          >
            K
          </motion.h1>
          <motion.h1
            variants={item}
            className="text-[clamp(5rem,17vw,10rem)] font-['Kaushan Script'] drop-shadow-md"
          >
            L
          </motion.h1>
          <motion.h1
            variants={item}
            className="text-[clamp(7rem,17vw,10rem)] font-['Kaushan Script'] drop-shadow-md"
          >
            P
          </motion.h1>
          <motion.h1
            variants={item}
            className="text-[clamp(7rem,17vw,10rem)] font-['Kaushan Script'] drop-shadow-md"
          >
            S
          </motion.h1>
          <motion.h1
            variants={item}
            className="text-[clamp(7rem,17vw,10rem)] font-['Kaushan Script'] drop-shadow-md"
          >
          </motion.h1>
        </div>
      </motion.div>
    </section>
  );
};

export default CoverVideo;
