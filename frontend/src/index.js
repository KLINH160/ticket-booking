import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Đảm bảo đường dẫn này đúng

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
