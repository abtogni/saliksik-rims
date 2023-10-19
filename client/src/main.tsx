import React from 'react'
import ReactDOM from 'react-dom/client'
import {  BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import MainRouter from './router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <div className='antialiased'>
      <Routes>
          <Route path="/*" element={<MainRouter />} />
      </Routes>
    </div>

    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
