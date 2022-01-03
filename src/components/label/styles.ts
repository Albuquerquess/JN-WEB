import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;

  & > h1 {
    font-size: 2.2em;
    margin-bottom: 0.46em;
  }

  & > h2 {
    font-size: 1.2em;
    font-weight: 300;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    text-align: center;
    margin-bottom: 4em;

    h1 {
      font-size: 4.8em;
    }

    h2 {
      font-size: 1.8em;
    }
  }
`;
