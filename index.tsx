
import React from 'react';
import ReactDOM from 'react-dom/client';
// Fix: Add file extension to import path.
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Elemento root non trovato. Impossibile montare l'applicazione React.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);