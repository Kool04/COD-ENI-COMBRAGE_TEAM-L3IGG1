import React from 'react'
import ReactDOM from 'react-dom/client';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import AppRouter from './router.jsx'
import { ContextProvider } from './contexts/ContextProvider';

const root = document.getElementById('root');

const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <React.StrictMode>
    <ContextProvider>
      <AppRouter />
    </ContextProvider>
  </React.StrictMode>
);
