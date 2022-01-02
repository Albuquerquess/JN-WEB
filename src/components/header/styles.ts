import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  margin-bottom: 4em;
  & > img {
    height: 5em;
    width: auto;
  }
  @media screen and (min-width: ${breakpoints.md}) {
    margin-bottom: 6em;
    & > img {
      height: 6.2em;
    }
  }
`;
