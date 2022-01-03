import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  width: 100%;
  max-width: 54em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    font-size: 2.2em;
    margin-bottom: 1.8em;
    font-weight: 700;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    h1 {
      font-size: 4.8em;
    }
  }
`;
