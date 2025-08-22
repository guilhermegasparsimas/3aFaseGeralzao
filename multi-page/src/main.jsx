import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'

// REACT ROUTER
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <h2>Hello World</h2>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)
