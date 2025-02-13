import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/index.css";
import "./assets/css/index.scss";
import routes from "./router";
import Layout from './components/layout/Layout';
import ErrorPage from './components/general/ErrorPage';
import AuthProvider from './context/AuthContext';
import { DeviceProvider } from './context/DevicesContext';
import { ClientsProvider } from './context/ClientsContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [ ...routes],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DeviceProvider>
        <ClientsProvider>
          <RouterProvider router={router} />
        </ClientsProvider>
      </DeviceProvider>
    </AuthProvider>
  </StrictMode>,
)
