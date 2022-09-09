import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <BeatLoader color="#00D84F" />
    </Container>
  );
};

export default Loading;
