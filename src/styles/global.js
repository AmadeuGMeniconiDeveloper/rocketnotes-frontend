import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    /* border: 1px dotted red; */
  }

  body {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800}; 
    color: ${({ theme }) => theme.COLORS.WHITE};

    /* -webkit-font-smoothing: antialiased; */
  }

  body, input, button, textarea {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
    outline: none;
  }

  a {
    text-decoration: none;
  }

  button, a {
    cursor: pointer;
    transition: filter 0s;
  }

  button:hover, a:Hover {
    filter: brightness(1.1);
  }

  button:active, a:active {
    filter: brightness(0.9);
    };
`;

export default GlobalStyle;
