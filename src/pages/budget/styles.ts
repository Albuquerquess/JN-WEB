import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  div:first-child {
    width: 100%;
    text-align: left;
  }

  main#budget {
    width: 100%;
    section#budget-infos {
      width: 100%;

      section.box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        margin-bottom: 2em;

        h2.budget-title {
          font-size: 20px;
          margin-bottom: 20px;
          font-weight: 700;
        }

        p.budget-text {
          font-size: 16px;
          margin-bottom: 1em;

          & > strong {
            font-weight: 700;
          }
        }
      }

      p#final-price {
        color: ${props => props.theme.colors.textGreen};
        font-size: 18px;
        font-weight: 900;
        & > strong {
          color: ${props => props.theme.colors.text};
        }
      }
    }

    aside {
      width: 100%;
      margin-bottom: 40px;

      & > img {
        width: 100%;
        height: auto;
      }
    }
  }

  section#budget-buttons-wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button#budget-download {
      width: 100%;
      height: 50px;
      background-color: ${props => props.theme.colors.background};

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 0.5em;

      font-size: 18px;
      font-weight: 400;

      margin-top: 1em;

      cursor: pointer;

      & > img {
        margin-right: 1em;
      }

      span#text {
        font-size: 1.8em;
        color: ${props => props.theme.colors.textLight};
        font-weight: bold;
      }
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    main#budget {
      section.box {
        h2.budget-title {
          font-size: 28px;
        }
        p.budget-text {
          font-size: 22px;
        }
        p#final-price {
          font-size: 26px;
        }
      }

      aside > img {
        height: 400px;
      }
    }
    section#budget-buttons-wrapper {
      button#budget-download {
        height: 60px;
        max-width: 460px;

        p {
          font-size: 24px;
        }
      }
    }
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    main#budget {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      section#budget-infos {
        section.box {
          h2.budget-title {
            font-size: 32px;
          }

          p.budget-text {
            font-size: 24px;
          }
        }

        p#final-price {
          font-size: 32px;
        }
      }

      aside {
        margin-right: -120px;
        & > img {
          width: 500px;
          height: auto;
        }
      }
    }

    section#budget-buttons-wrapper {
      align-items: flex-start;
    }
  }

  @media screen and (min-width: 1600px) {
    main#budget {
      aside {
        margin-right: -300px;
        & > img {
          width: 616px;
          height: auto;
        }
      }
    }
  }
`;
