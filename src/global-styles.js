import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Ubuntu', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Ubuntu', sans-serif;
  }

  #app {
    position: relative;
    min-height: 100%;
    min-width: 100%;
  }
  .textarea[contenteditable]:empty::before {
  content: "Title";
}
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6{
    margin: 0
  }
  p,
  h1,h2,h3,h4,h5,h6
  span,
  label,
  button {
    font-family: 'Ubuntu', sans-serif;
    line-height: 1.5em;
  }
  
`;

export default GlobalStyle;
