import React from 'react'
import ReactDOM from 'react-dom/client'
import {  BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import MainRouter from './router';
import Heading from './routes/partials/Heading';
import Footing from './routes/partials/Footing';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <div className='antialiased'>
      <Heading />
      <Routes>
          <Route path="/*" element={<MainRouter />} />
      </Routes>
      <Footing />
    </div>

    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
