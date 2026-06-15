import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import BrowserRouter
import { BrowserRouter } from 'react-router-dom';

// Import AuthProvider (adjust path if needed)
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
