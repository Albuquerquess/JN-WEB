import React from 'react';
import { ThemeProvider } from 'styled-components';

import light from './light';
import { Container } from './styles';

const Themes: React.FC = ({ children }) => {
  return (
    <Container>
      <ThemeProvider theme={light}>{children}</ThemeProvider>
    </Container>
  );
};

export default Themes;
