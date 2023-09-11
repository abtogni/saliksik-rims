import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import Home from './routes/home';
import Login from './routes/auth/login';
import Register from './routes/auth/register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
