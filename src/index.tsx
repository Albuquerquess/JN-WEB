/* eslint-disable import/no-extraneous-dependencies */
import 'fast-text-encoding/text';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
