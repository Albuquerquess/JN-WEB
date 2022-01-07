import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  div#card-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    & > div {
      margin-bottom: 2em;
    }
  }
`;
