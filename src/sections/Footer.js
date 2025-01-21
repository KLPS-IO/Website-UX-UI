import React from "react";
import styled from "styled-components";

import { motion } from "framer-motion";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  margin: 5rem auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  position: relative;
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 10vw;
    height: auto;
  }
  h3 {
    font-size: ${(props) => props.theme.fontxxl};
    font-family: "Kaushan Script";

    @media (max-width: 48em) {
      font-size: ${(props) => props.theme.fontxl};
    }
  }
`;


const FooterComponent = styled(motion.footer)`
  width: 80vw;

  @media (max-width: 48em) {
    width: 90vw;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 2rem;
    margin-top: 4rem;
    padding: 0 1rem;
    border-top: 1px solid ${(props) => props.theme.text};
    border-bottom: 1px solid ${(props) => props.theme.text};

    @media (max-width: 48em) {
      justify-content: center;
    }
  }

  li {
    padding: 2rem;
    font-size: ${(props) => props.theme.fontlg};
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    @media (max-width: 48em) {
      padding: 1rem;
      font-size: ${(props) => props.theme.fontmd};
    }
  }
`;

const Bottom = styled.div`
  padding: 0.5rem 0;
  margin: 0 4rem;
  font-size: ${(props) => props.theme.fontlg};

  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    text-decoration: underline;
  }

  @media (max-width: 64em) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 0;
    span {
      transform: none !important;
    }
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${(props) => `calc(${props.theme.fontBig} - 5vw)`}; /* Adjust font size */
  font-family: "Kaushan Script";
  font-weight: 300;
  text-align: center;
  white-space: nowrap; /* Prevent text wrapping */
  z-index: 5;

  @media (max-width: 60em) {
    font-size: ${(props) => `calc(${props.theme.fontBig} - 8vw)`};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxxl}; /* Further reduce size on smaller screens */
  }
`;




const Footer = () => {
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    let elem = document.querySelector(id);

    scroll.scrollTo(elem, {
      offset: "-100",
      duration: "2000",
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  };

  return (
    <Section>
      <LogoContainer data-scroll
        data-scroll-speed="-2"
        data-scroll-direction="horizontal">
        <svg width="600" height="200" viewBox="0 0 500 1300">

        {/* First Shape */}
        <polygon points="100,0 100,280 0 400 1,0" stroke="white" strokeWidth="15" fill="#FF00FF" />

        {/* Small Bottom Middle Shape */}
        <polygon points="170,200 100,280 100,400 180,400 " stroke="white" strokeWidth="15" fill="#FF00FF" />

        {/* Right-side element */}
        <path d="M175,120 L330,0.3 L450,4 L300,145 L500,399 L379,399 Z" stroke="white" strokeWidth="15" fill="#FF00FF" />
        </svg>
        <Title>PRODUCTS COMING SOON</Title>
        <h3 data-scroll data-scroll-speed="-1">
            KLPS
          </h3>
      </LogoContainer>
      <FooterComponent
        initial={{ y: "-400px" }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 1.5,
        }}
      >
        <ul>
          <li onClick={() => handleScroll("#home")}>home</li>
          <li onClick={() => handleScroll(".about")}>about</li>
          <li onClick={() => handleScroll("#ai")}>explore</li>
          <li onClick={() => handleScroll("#shop")}>shop</li>
          <li>
            <a href="https://google.com" target="_blank" rel="noreferrer">
              look book
            </a>
          </li>
          <li>
            <a href="https://google.com" target="_blank" rel="noreferrer">
              reviews
            </a>
          </li>
        </ul>
        <Bottom>
          <span
            data-scroll
            data-scroll-speed="2"
            data-scroll-direction="horizontal"
          >
            &copy; {new Date().getFullYear()}. All Rights Reserved.
          </span>
          <span
            data-scroll
            data-scroll-speed="-2"
            data-scroll-direction="horizontal"
          >
            Made with &hearts; by &nbsp;
            <a
              href="https://klps.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              KLPS
            </a>
          </span>
        </Bottom>
      </FooterComponent>
    </Section>
  );
};

export default Footer;
