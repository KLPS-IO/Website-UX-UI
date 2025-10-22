import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
      delay: 5,
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
      delay: 3,
    },
  },
};

const Logo = () => {
  return (
    <div className="absolute top-4 left-4 w-full text-foreground z-[5]">
      <Link to="/" className="flex items-end">
        <svg width="120" height="80" viewBox="0 0 600 400" className="w-16 h-auto overflow-visible">
          {/* First Shape */}
          <polygon 
            points="100,0 100,280 10,400 10,0" 
            stroke="currentColor" 
            strokeWidth="15" 
            fill="#FF00FF" 
          />
          {/* Small Bottom Middle Shape */}
          <polygon 
            points="190,190 110,280 110,410 190,410" 
            stroke="currentColor" 
            strokeWidth="15" 
            fill="#FF00FF" 
          />
          {/* Right-side element */}
          <path 
            d="M135,140 L300,0.5 L450,0 L280,145 L525,400 L379,400 Z" 
            stroke="currentColor" 
            strokeWidth="15" 
            fill="#FF00FF" 
          />
          <g>
            <motion.path
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          </g>
        </svg>
        <motion.span
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl text-foreground pb-2"
        >
          KLPS
        </motion.span>
      </Link>
    </div>
  );
};

export default Logo;
