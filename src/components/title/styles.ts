import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  margin-bottom: 2em;
  h1#title {
    font-size: 2.2em;
    margin-bottom: 10px;
  }

  h2#subtitle {
    font-size: 1.2em;
    font-weight: 300;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    text-align: center;
    margin-bottom: 40px;
    h1#title {
      font-size: 4.8em;
      margin-bottom: 23px;
    }
    h2#subtitle {
      font-size: 18px;
      color: ${props => props.theme.colors.subtitle};
    }
  }
`;
