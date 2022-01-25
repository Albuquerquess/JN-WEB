import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  div.furniture-card-container {
    & > div {
      margin-bottom: 4em;
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    div.furniture-card-container {
      & > div {
        margin-bottom: 4em;
      }
    }
  }
`;
