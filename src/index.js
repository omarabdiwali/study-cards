import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <SnackbarProvider preventDuplicate>
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);
