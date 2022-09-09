import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d5d5d5 0% 0% no-repeat padding-box;
  border-radius: 5px;

  & > span#text {
    font-size: 2em;

    max-height: 50px;
    overflow: auto;
    padding: 0.5em;
  }
`;
