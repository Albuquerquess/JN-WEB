import React from 'react';

import { Container } from './styles';

interface ILabelProps {
  label: string;
  sublabel: string | undefined;
}

const Label: React.FC<ILabelProps> = ({ label, sublabel }) => {
  return (
    <Container>
      <h1>{label}</h1>
      {sublabel && <h2>{sublabel}</h2>}
    </Container>
  );
};

export default Label;
