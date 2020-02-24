import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  *::after,
  *::before {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    background: #eee;
  }
  a {
    text-decoration: none;
  }
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }
`;
