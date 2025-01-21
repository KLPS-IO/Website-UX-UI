import { createGlobalStyle } from "styled-components";
import "@fontsource/kaushan-script";
import "@fontsource/sirin-stencil";


const GlobalStyles = createGlobalStyle`

*,*::before,*::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    font-family: "Sirin Stencil";
    overflow-x: hidden;
    line-height: 1.6; /* Improves text readability */
    background-color: #fff; /* Ensure a default background color */
}

h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}

a{
    color: inherit;
    text-decoration: none;
}

img, video {
    max-width: 100%;
    height: auto; /* Ensures images and videos scale correctly */
}

[data-scroll-container] {
    overflow: hidden;
    width: 100%;
}

main[data-scroll-container] {
    position: relative;
    width: 100%;
    overflow-x: hidden;
}
`

export default GlobalStyles;