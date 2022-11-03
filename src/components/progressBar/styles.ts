import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

interface IStyleProgressBarProps {
  visible: boolean;
}

export const Container = styled.div<IStyleProgressBarProps>`
  width: 100%;

  display: ${props => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  margin-bottom: 10.75em;

  div#progress-bar-line-background {
    width: 100%;
    background: #707070;
    height: 0.3em;
    z-index: 0;
  }

  div.RSPBprogressBar {
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    flex-direction: row;
    position: relative;

    div.RSPBprogression {
      height: 0.3em;
      position: absolute;
      z-index: -1;

      transition: width 1s;
    }

    div.RSPBstep {
      max-width: 4.8em;
      div.step-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        height: 100%;
        margin-top: 1.3em;

        div {
          font-size: 1.4em;
          font-family: 'Ubuntu';
          transform: translateY(1em);
        }
        img {
          width: 4.8em;
        }
      }
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    margin-bottom: 13.7em;
    div.RSPBprogressBar > div.RSPBstep > div.step-container {
      img {
        width: 7em;
      }
      div {
        font-size: 2em;
      }
    }
  }
  @media screen and (min-width: ${breakpoints.lg}) {
    div.RSPBprogressBar > div.RSPBstep > div.step-container > img {
      width: 9.2em;
    }
  }
`;
