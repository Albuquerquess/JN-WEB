import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  width: 100%;
  height: 6em;

  & > label {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    & > span {
      font-size: 1.2em;
      font-weight: bold;
      padding-left: 0.5em;
      padding-bottom: 1em;
    }

    & > input {
      height: 100%;
      width: 100%;
      border: none;
      padding-left: 0.5em;
      font-size: 1.2em;
    }

    hr {
      width: 100%;
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid ${props => props.theme.colors.cardLine};
      margin-top: 1em;
      padding: 0;
    }

    span.input-error {
      font-size: 1em;
      color: ${props => props.theme.colors.textAlert};
      font-weight: bold;
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    & > label {
      span,
      input {
        font-size: 1.9em;
      }

      span.input-error {
        font-size: 1.6em;
      }
    }
  }
`;
