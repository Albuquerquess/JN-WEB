import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';
import { IContainerPropsWithOnclick } from '../../types/common.d';

export interface IStyleButtonProps extends IContainerPropsWithOnclick {
  background?: string;
  color?: string;
}

export const Container = styled.div<IStyleButtonProps>`
  width: 100%;
  height: 5em;
  max-height: 100%;
  background-color: ${props =>
    props.background ? props.background : props.theme.colors.buttonNormal};

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5em;
  cursor: pointer;

  span#text {
    font-size: 1.8em;
    color: ${props =>
      props.color ? props.color : props.theme.colors.textLight};
    font-weight: bold;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    max-width: 46em;
    height: 6em;

    span#text {
      font-size: 2.4em;
    }
  }
`;
