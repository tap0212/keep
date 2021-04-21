import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import '~antd/dist/antd.css';
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
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
