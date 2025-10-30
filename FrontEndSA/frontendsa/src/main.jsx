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
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    
    element: (
      <PrivateRoute>
          <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {path: 'dashboard', element: <Dashboard /> },
      // {path: 'pacientes', element: <PatientsPage /> },
    ]
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
