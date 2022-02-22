import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

interface IStyleFooterProps {
  onFurniturePage: boolean;
}

export const Container = styled.div<IStyleFooterProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100vw;

  padding-bottom: ${props => (props.onFurniturePage ? '8.1em' : '0')};

  & > main {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: ${props => props.theme.colors.footer};

    padding-bottom: 4em;
    padding-top: 4em;

    & > img {
      width: 12.5em;
      height: auto;

      margin-bottom: 2em;
    }

    & > p {
      text-align: center;
      line-height: 15px;
    }

    section#footer-icons {
      width: 122px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      margin-top: 2em;

      & > a > img {
        width: 2.7em;
        height: auto;
      }
    }
  }
  section#footer-copy-right {
    width: 100%;
    background-color: ${props => props.theme.colors.copyRight};
    text-align: center;
    padding: 2em 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    line-height: 15px;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    & > main {
      & > img {
        width: 20em;
      }
      & > p {
        font-size: 1.6em;
      }
      section#footer-icons {
        width: 200px;
        margin-top: 3em;

        & > a > img {
          width: 4em;
        }
      }
    }

    section#footer-copy-right {
      line-height: 15px;
      & > p,
      & > span#devs > p {
        font-size: 1.4em;
        margin-bottom: 0.8em;
      }

      & > p:last-child {
        margin-bottom: 0;
      }
    }
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    section#footer-copy-right {
      width: 100%;

      flex-direction: row;
      justify-content: space-between;

      padding-left: 6em;
      padding-right: 6em;

      & > p {
        margin-bottom: 0em;
      }

      & > span#devs {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > p:first-child {
          margin-right: 2em;
        }
      }
    }
  }
`;
