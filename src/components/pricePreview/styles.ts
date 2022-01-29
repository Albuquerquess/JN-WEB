import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

interface IStylePricePreview {
  isOpen: boolean;
}

export const Container = styled.div<IStylePricePreview>`
  width: 100vw;
  height: ${props => (props.isOpen ? '226px' : '81px')};

  transition: height 0.2s ease-in-out, opacity 0.5s 1s ease-in-out;

  position: fixed;
  bottom: 0;

  padding: 2em;

  color: ${props => props.theme.colors.textLight};

  background: transparent linear-gradient(264deg, #303030 0%, #404040 100%) 0%
    0% no-repeat padding-box;
  opacity: 1;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  div#price-preview-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    main {
      width: 100%;

      p#current-price {
        font-size: 16px;
        font-weight: bold;

        margin-bottom: ${props => (props.isOpen ? '25px' : '0')};

        span#current-price-preview {
          color: ${props => props.theme.colors.textGreen};
        }
      }
      dIv#price-preview-tools-wrapper {
        display: ${props => (props.isOpen ? 'block' : 'none')};
        div.price-preview-select-box {
          margin-bottom: 15px;
          cursor: pointer;

          & > p {
            font-size: 1.4em;
            font-weight: bold;
            margin-bottom: 10px;
          }
        }
      }
    }

    aside {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: ${props => (props.isOpen ? 'space-between' : 'center')};

      width: 40px;
      height: ${props => (props.isOpen ? '100%' : '40px')};

      background-color: #00d84f;
      border-radius: 0.5em;

      margin-left: 20px;
      padding: 10px 0;

      & > img#close-icon {
        width: 40px;
        height: 40px;
        display: ${props => (props.isOpen ? 'block' : 'none')};
      }
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    height: ${props => (props.isOpen ? '350px' : '100px')};
    padding: 0 40px;

    div#price-preview-wrapper {
      main {
        p#current-price {
          font-size: 28px;
        }
        div#price-preview-tools-wrapper {
          div.price-preview-select-box {
            & > p {
              font-size: 28px;
            }
          }
        }
      }

      aside {
        width: 60px;
        height: ${props => (props.isOpen ? '100%' : '60px')};
      }
    }
  }

  /*   @media screen and (min-width: 1440px) {
    div#price-preview-wrapper {
      main {
        p#current-price {
          font-size: 24px;
        }

        div#price-preview-tools-wrapper {
          div.price-preview-select-box {
            & > p {
              font-size: 24px;
            }
          }
        }
      }
    }
  } */

  @media screen and (min-width: ${breakpoints.xl}) {
    height: 100px;
    div#price-preview-wrapper {
      main {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 20px;

        p#current-price {
          font-size: 32px;
          margin-bottom: 0;
        }

        dIv#price-preview-tools-wrapper {
          display: flex;

          img#drop-icon-desktop {
            display: block;

            height: 60px;
            width: auto;

            margin-right: 40px;
          }

          div.price-preview-select-box {
            display: flex;
            margin-bottom: 0;
            align-items: center;
            flex-direction: row;

            & > p {
              font-size: 32px;
              margin-right: 20px;
              margin-bottom: 0;
            }
          }

          div.price-preview-select-box:last-child {
            margin-left: 40px;
          }
        }
      }
      aside {
        display: none;
      }
    }
  }
`;
