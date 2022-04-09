import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);
root.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);

// if (!rootElement) {
//   throw new Error('Failed to find the root element');
// }

// ReactDOM.createRoot(rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
