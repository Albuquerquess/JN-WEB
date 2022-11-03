import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  & > img {
    height: 5em;
    width: auto;
  }
  @media screen and (min-width: ${breakpoints.md}) {
    margin-bottom: 6.4em;

    & > img {
      height: 6.2em;
    }
  }
`;
