import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/svg/logo.svg';
import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Link to="/" style={{ cursor: 'pointer' }}>
      <Container>
        <h1>ALTERAÇÃO</h1>
        <img src={logo} alt="JN - Móveis Planejados" />
      </Container>
    </Link>
  );
};

export default Header;
