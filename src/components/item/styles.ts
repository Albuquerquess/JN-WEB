import styled from 'styled-components';

interface IStyleItemProps {
  disabled: boolean;
}

export const Container = styled.div<IStyleItemProps>`
  width: 100%;
  height: 50px;

  display: grid;
  grid-template-columns: 1fr repeat(2, 118px);
  grid-template-rows: 50px;
  column-gap: 26px;

  input.title,
  input.title:disabled {
    font-size: 20px;
    font-weight: bold;

    background: #d5d5d5 0% 0% no-repeat padding-box;
    border-radius: 5px;
    padding-left: 1em;

    border: none;

    display: flex;
    align-items: center;

    color: #000000;

    cursor: ${props => (props.disabled ? 'pointer' : 'text')};
  }
`;
