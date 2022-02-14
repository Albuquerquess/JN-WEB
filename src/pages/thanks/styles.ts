import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  margin-top: 5em;

  & > h1 {
    font-size: 2.4em;

    margin-bottom: 10px;
  }

  & > h2 {
    font-size: 1.8em;
    font-weight: 300;

    margin-bottom: 40px;

    color: #707070;
  }

  & > img {
    width: 12.8em;
    height: auto;

    margin-bottom: 40px;
  }

  & > p {
    font-size: 1.8em;

    margin-bottom: 60px;
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    margin-top: 10em;

    & > h1 {
      font-size: 3.6em;

      margin-bottom: 25px;
    }

    & > h2 {
      font-size: 2.4em;
    }
    & > img {
      width: 23em;
    }
    & > p {
      font-size: 2.4em;
    }
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    margin-top: 4em;

    & > h1 {
      font-size: 5em;

      margin-bottom: 20px;
    }

    & > h2 {
      font-size: 4em;
    }
    & > img {
      width: 22.6em;
      margin-bottom: 70px;
    }
    & > p {
      font-size: 5em;
      margin-bottom: 77px;
    }
  }
`;
