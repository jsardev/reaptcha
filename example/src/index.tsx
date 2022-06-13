import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './containers';

const app = document.getElementById('app');
if (!app) {
  throw new Error('No app element found');
}

const root = createRoot(app);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
