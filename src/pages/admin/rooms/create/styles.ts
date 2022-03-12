import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;

  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;

  & > section#room,
  section#furnitures {
    width: 100%;
    margin-bottom: 20px;

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
  }

  section#room {
    div#rooms-list {
      margin-top: 20px;
      & > div {
        margin-bottom: 20px;
      }
    }
  }
`;
