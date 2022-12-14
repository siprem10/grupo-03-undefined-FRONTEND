import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import App from './App';
import './index.css';

axios.defaults.baseURL = process.env.REACT_APP_API || "http://127.0.0.1:5173/";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
