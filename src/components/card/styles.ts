import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

interface IStyleCardProps {
  image: string | undefined;
}

export const Container = styled.div<IStyleCardProps>`
  width: 100%;
  max-height: 100%;

  background: #efefef;

  border-radius: 1.5em;
  padding: 2em;

  section.card-header {
    height: 24.6em;
    background: #d5d5d5;
    border-radius: 1.5em;
    margin-bottom: 2em;
    background-image: url(${props => props.image});

    background-repeat: no-repeat;
    background-position: center center;
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
  }

  section.card-body {
    h3 {
      font-size: 1.4em;
      margin-bottom: 0.71em;
    }

    p {
      font-size: 1.2em;
    }
  }

  section.children-box {
    margin-top: 1.8em;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    width: 48%;
    height: 58em;

    section.card-header {
      height: 59.04%;
    }

    section.card-body {
      h3 {
        font-size: 3.2em;
      }
      p {
        font-size: 2em;
        font-weight: 300;
      }
    }
  }
`;
