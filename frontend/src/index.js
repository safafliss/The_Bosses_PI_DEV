
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from './redux/store';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import "./assets/styles/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);




