import styled from 'styled-components';

import { breakpoints } from '../../styles/breakpoints';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  margin-top: 50px;

  & > div:first-child {
    text-align: center;
  }

  iframe#video-youtube-iframe {
    margin-bottom: 20px;
    width: 100%;
    height: 200px;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    margin-top: 0;

    iframe#video-youtube-iframe {
      height: 500px;
    }
  }
`;
