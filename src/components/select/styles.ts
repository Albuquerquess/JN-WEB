import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  /* react-select css modify */
  div.react-select__input-container {
    background: none;
  }
  div.react-select__single-value {
    color: ${props => props.theme.colors.textLight};
  }
  div.react-select__menu,
  div.react-select__menu-list {
    border-radius: 0 0 0.5em 0.5em;
  }

  div.react-select__option {
    background: none;
  }

  div.react-select__placeholder {
    opacity: 0.7;
  }

  /* end react-select css modify */

  @media screen and (min-width: ${breakpoints.md}) {
    div.react-select__control {
      height: 4.32em;
    }

    div.react-select__option,
    div.react-select__placeholder,
    div.react-select__single-value {
      font-size: 21px;
    }
  }
`;
