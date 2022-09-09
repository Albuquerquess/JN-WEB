import styled from 'styled-components';

import { breakpoints } from '../../../styles/breakpoints';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  & > form {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    div#input-group {
      width: 100%;
      height: 100%;

      & > div {
        margin-bottom: 2em;
      }

      & > div:last-child {
        margin-bottom: 10em;
      }
    }

    div#contact-errors {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      span {
        font-size: 1.4em;
        color: ${props => props.theme.colors.textAlert};
        font-weight: bold;
      }
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    form > div#input-group > div {
      margin-bottom: 7em;
    }
  }
`;
