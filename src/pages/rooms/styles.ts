import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  width: 100%;

  div#rooms-card-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;

    & > div {
      margin-bottom: 20px;

      section.children-box {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  div#rooms-card-container > div:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    div#rooms-card-container > div {
      width: 480px;
    }
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    div#rooms-card-container {
      flex-direction: row;
      align-items: flex-start;
      & > div {
        width: 48%;
      }

      & > div:nth-child(2n + 1) {
        margin-right: 28px;
      }
    }
  }
`;
