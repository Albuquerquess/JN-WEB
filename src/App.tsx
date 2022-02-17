import React from 'react';
import { Provider as Redux } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { PersistGate } from 'redux-persist/integration/react';

import Box from './components/box';
import Footer from './components/footer';
import Header from './components/header';
import ProgressBar from './components/progressBar';
import Routes from './routes';
import { persistor, store } from './store';
import GlobalStyle from './styles/global';
import Themes from './themes';

const App = () => {
  return (
    <BrowserRouter>
      <Redux store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider placement="top-right">
            <Themes>
              <GlobalStyle />
              <Header />
              <Box>
                <ProgressBar porcent={80} />
                <Routes />
              </Box>
              <Footer />
            </Themes>
          </ToastProvider>
        </PersistGate>
      </Redux>
    </BrowserRouter>
  );
};

export default App;
