import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  div#root {
    height: 100vh
  }

  body {
    background: #ffffff;
    color: #000000;
    -webkit-font-smoothing: antialiased;
    width: 100vw;
    height: 100%;

    /* Select Icon Price Index */
    div.select-label {
      display: flex;
      align-items: center;

      & > img.price-index-icon-img {
        height: 2em;
        width: auto;
        margin-right: 1em;
      }
    }
  }

  body, input, button {
    font-family: 'Roboto', serif;
    font-size: 62.5%;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;
