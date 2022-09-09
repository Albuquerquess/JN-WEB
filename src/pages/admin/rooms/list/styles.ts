import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;

  header {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    & > h2 {
      font-size: 2.4em;
      font-weight: bold;
    }
  }
  & > main {
    display: flex;
    margin-top: 2em;

    & > div#rooms-list {
      width: 100%;
      height: auto;

      & > div {
        margin-top: 20px;
      }
    }
  }
`;
