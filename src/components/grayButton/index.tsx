import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IButtonProps } from '../../types/button';
import { Container } from './styles';

const GrayButton: React.FC<IButtonProps> = ({
  label,
  navigateTo,
  handleClick,
}) => {
  const navigate = useNavigate();

  function handle() {
    if (navigateTo) {
      navigate(navigateTo);
    } else if (handleClick) {
      handleClick();
    }
  }
  return (
    <Container onClick={() => handle()}>
      <span id="text">{label || 'Adicionar ambiente'}</span>
    </Container>
  );
};

export default GrayButton;
