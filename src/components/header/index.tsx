import React from 'react';

import logo from '../../assets/svg/logo.svg';
import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <img src={logo} alt="" />
    </Container>
  );
};

export default Header;
