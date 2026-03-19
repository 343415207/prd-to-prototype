import React from 'react';
import ReactDOM from 'react-dom/client';
import { Agentation } from 'agentation';
import 'antd-mobile/es/global';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <App />
    <Agentation />
  </React.Fragment>
);
