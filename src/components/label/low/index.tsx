import React from 'react';

import { Container } from './styles';

interface ILowLabelProps {
  label: string;
}

const LowLabel: React.FC<ILowLabelProps> = ({ label }) => {
  return (
    <Container>
      <h1>{label}</h1>
    </Container>
  );
};

export default LowLabel;
