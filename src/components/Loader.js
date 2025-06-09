import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  touch-action: none;
  overflow: hidden;

  width: 100vw;
  height: 100vh;

  z-index: 6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  svg {
    width: 10vw;
    height: auto;
    overflow: visible;
    stroke-linejoin: round;
    stroke-linecap: round;

    g {
      path {
        stroke: ${(props) => props.theme.text};
      }
    }
  }

  @media (max-width: 48em) {
    svg {
      width: 20vw;
    }
  }
`;

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontxl};
  color: ${(props) => props.theme.text};
  padding-top: 0.5rem;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;

const textVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 1,
      yoyo: Infinity, // repeats infinite times
      ease: "easeInOut",
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
      ease: "easeInOut",
    },
  },
};

const Loader = () => {
  return (
    <Container
      initial={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: "100%",
        opacity: 0,
      }}
      transition={{
        duration: 2,
      }}
    >
      <svg width="600" height="400" viewBox="0 0 500 400">

      {/* First Shape */}
      <polygon points="100,0 100,280 10 400 10,0" stroke="white" strokeWidth="15" fill="#FF00FF" />

      {/* Small Bottom Middle Shape */}
      <polygon points="170,200 100,280 100,400 180,400 " stroke="white" strokeWidth="15" fill="#FF00FF" />

      {/* Right-side element */}
      <path d="M175,120 L330,0.3 L450,4 L300,145 L500,399 L379,399 Z" stroke="white" strokeWidth="15" fill="#FF00FF" />
<g></g>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="48px"
        viewBox="0 0 24 24"
        width="48px"
        fill="none"
      >
        <g></g> */}
        <g>
          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        </g>
      </svg>
      <Text variants={textVariants} initial="hidden" animate="visible">
        KLPS
      </Text>
    </Container>
  );
};

export default Loader;
