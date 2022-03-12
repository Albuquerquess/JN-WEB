import React from 'react';

import { Container } from './styles';

interface IPropsMedium {
  label: string;
}

const Medium: React.FC<IPropsMedium> = ({ label }) => {
  return (
    <Container>
      <h2>{label}</h2>
    </Container>
  );
};

export default Medium;
