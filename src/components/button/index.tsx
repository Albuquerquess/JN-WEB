import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IButtonProps } from '../../types/button';
import { Container } from './styles';

const Button: React.FC<IButtonProps> = ({
  color,
  label,
  background,
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
    <Container onClick={() => handle()} background={background} color={color}>
      <span id="text">{label || 'Continuar'}</span>
    </Container>
  );
};

export default Button;
