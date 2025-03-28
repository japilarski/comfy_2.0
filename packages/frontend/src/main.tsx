import React from 'react';

import { createRoot } from 'react-dom/client';
import { App } from './App';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-center" />
  </Provider>
);
