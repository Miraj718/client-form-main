import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Create a root

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
