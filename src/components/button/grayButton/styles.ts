import styled from 'styled-components';

import { IContainerPropsWithOnclick } from '../../../types/common';

export const Container = styled.div<IContainerPropsWithOnclick>`
  width: 262px;
  max-width: 262px;
  min-height: 38px;
  max-height: 100%;
  background-color: ${props => props.theme.colors.buttonGray};

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5em;
  cursor: pointer;

  span#text {
    font-size: 1.8em;
    color: ${props => props.theme.colors.text};
    font-weight: bold;
  }
`;
