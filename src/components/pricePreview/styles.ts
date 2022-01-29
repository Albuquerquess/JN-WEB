import styled from 'styled-components';

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

  display: flex;
  flex-direction: row;
  align-items: ${props => (props.isOpen ? 'flex-start' : 'center')};
  justify-content: space-between;

  background: transparent linear-gradient(264deg, #303030 0%, #404040 100%) 0%
    0% no-repeat padding-box;
  opacity: 1;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  main {
    width: 100%;

    p#current-price {
      font-size: 1.6em;
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

        img#drop-icon-desktop {
          display: none;
        }

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
    padding: 10px 0;

    width: 40px;
    height: 100%;
    background-color: #00d84f;
    border-radius: 0.5em;
    margin-left: 20px;

    & > img#close-icon {
      display: ${props => (props.isOpen ? 'block' : 'none')};
    }
  }

  @media screen and (max-width: 1329.7px) {
    height: ${props => (props.isOpen ? '350px' : '100px')};
    padding: 0 40px;
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

  @media screen and (min-width: 1330px) {
    height: 100px;
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
`;
