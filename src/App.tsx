import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import Box from './components/box';
import Header from './components/header';
import ProgressBar from './components/progressBar';
import Routes from './routes';
import GlobalStyle from './styles/global';
import Themes from './themes';

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider placement="top-right">
        <Themes>
          <GlobalStyle />
          <Box>
            <Header />
            <ProgressBar porcent={80} />
            <Routes />
          </Box>
        </Themes>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
