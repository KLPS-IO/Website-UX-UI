import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;

  width: 100%;
  color: ${(props) => props.theme.text};
  z-index: 5;

  a {
    display: flex;
    align-items: flex-end;
  }

  svg {
    width: 4rem;
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
`;

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  padding-bottom: 0.5rem;
`;

const textVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: -5,

    transition: {
      duration: 2, // 2
      delay: 5,
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
      delay: 3,
      ease: "easeInOut",
    },
  },
};

const Logo = () => {
  return (
    <Container>
      <Link to="/">
        <svg width="600" height="400" viewBox="0 0 600 400">

          {/* First Shape */}
          <polygon points="100,0 100,280 10 400 10,0" stroke="white" strokeWidth="15" fill="#FF00FF" />

          {/* Small Bottom Middle Shape */}
          <polygon points="170,200 100,280 100,400 180,400 " stroke="white" strokeWidth="15" fill="#FF00FF" />

          {/* Right-side element */}
          <path d="M175,120 L330,0.3 L450,4 L300,145 L500,399 L379,399 Z" stroke="white" strokeWidth="15" fill="#FF00FF" />

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
      </Link>
    </Container>
  );
};

export default Logo;
