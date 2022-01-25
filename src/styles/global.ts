import { createGlobalStyle } from 'styled-components';

import { breakpoints } from './breakpoints';

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

  /* Scrollbar */
  body::-webkit-scrollbar {
    width: 6px;               /* width of the entire scrollbar */
    height: 0;
  }

  body::-webkit-scrollbar-track {
    background: #D5D5D5;        /* color of the tracking area */
  }

  body::-webkit-scrollbar-thumb {
    background-color: #DDDDDD;    /* color of the scroll thumb */
    border-radius: 6px;       /* roundness of the scroll thumb */
  }
    /* End scrollbar */

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

      img.price-index-icon-img {
        height: 2em;
        width: auto;
        margin-right: 1em;
      }
    }

    @media screen and (min-width: ${breakpoints.md}) {
    div.select-label{
      font-size: 20px;
      font-weight: normal;

      & > img.img.price-index-icon-img {
        height: 29px;
        margin-right: 10px;
    }
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
