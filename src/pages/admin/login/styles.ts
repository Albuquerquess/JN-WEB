import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 82vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 150px;

  & > h1 {
    font-size: 4.8em;
    font-weight: bold;
    margin-bottom: 68px;
  }

  & > form {
    width: 100%;
    max-width: 46em;

    div#input-group {
      margin-bottom: 100px;
      & > div {
        margin-bottom: 1em;
        height: 100%;
      }
    }
  }
`;
