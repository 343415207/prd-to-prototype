import React from 'react';
import ReactDOM from 'react-dom/client';
import { Agentation } from 'agentation';
import 'antd/dist/antd.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Agentation />
  </>
);
