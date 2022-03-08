import React from 'react';

import trashIcon from '../../assets/svg/trash.svg';
import { IButtonProps } from '../../types/button';
import { Container } from './styles';

const TrashButton: React.FC<IButtonProps> = ({ handleClick }) => {
  function handle() {
    if (handleClick) handleClick();
  }

  return (
    <Container onClick={() => handle()}>
      <img src={trashIcon} alt="Deletar" />
    </Container>
  );
};

export default TrashButton;
