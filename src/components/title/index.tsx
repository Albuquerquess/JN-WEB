import React from 'react';

import { Container } from './styles';

interface ITitleProps {
  title: string | undefined;
  subtitle: string | undefined;
}

const Title: React.FC<ITitleProps> = ({ title, subtitle }) => {
  return (
    <Container>
      <h1 id="title">{title}</h1>
      <h2 id="subtitle">{subtitle}</h2>
    </Container>
  );
};

export default Title;
