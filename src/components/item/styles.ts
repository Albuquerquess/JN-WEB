import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 50px;

  display: grid;
  grid-template-columns: 1fr repeat(2, 118px);
  grid-template-rows: 50px;
  column-gap: 26px;

  div.title {
    font-size: 20px;
    font-weight: bold;

    background: #d5d5d5 0% 0% no-repeat padding-box;
    border-radius: 5px;
    padding-left: 1em;

    display: flex;
    align-items: center;

    cursor: pointer;
  }
`;
