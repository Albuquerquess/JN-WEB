import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  width: 100%;

  display: flex;
  align: center;
  justify-content: center;

  div.RSPBprogressBar {
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    flex-direction: row;
    position: relative;

    div.RSPBprogression {
      height: 0.2em;
      position: absolute;
      z-index: -1;
    }
    div.RSPBstep > img {
      width: 4.8em;
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    div.RSPBprogressBar > div.RSPBstep > img {
      width: 7em;
    }
  }
  @media screen and (min-width: ${breakpoints.lg}) {
    div.RSPBprogressBar > div.RSPBstep > img {
      width: 9.2em;
    }
  }
`;
