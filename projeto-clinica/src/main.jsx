import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Login from './pages/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
// import App from './App.jsx' @@Retiramos esta importação pois não estamos mais utilizando o css desta página, estamos usando tailwindcss, e no arquivo index.css importamos o @ import "tailwindcss" para utilizar de modo GLOBAL neste projeto

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import DashboardLayout from './layouts/DashboardLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
          <DashboardLayout />
      </PrivateRoute>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router}/>

    </AuthProvider>


  </StrictMode>,
)
