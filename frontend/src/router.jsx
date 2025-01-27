import Layout from "./components/layout/Layout";
import ErrorPage from "./components/general/ErrorPage";
import Home from "./pages/Home";
import SignUp from "./components/general/SignUp";
import LogIn from "./components/general/LogIn";
import Dashboard from "./components/inventory/Dashboard";
import Laptops from "./components/inventory/Laptops";
import Tablets from "./components/inventory/Tablets";
import Desktops from "./components/inventory/Desktops";
import Projectors from "./components/inventory/Projectors";

const routes = [
    { index: true, element: <Home /> }, // renders at "/"
    { path: "sign-up", element: <SignUp /> },
    { path: "log-in", element: <LogIn /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "devices/laptops", element: <Laptops /> },
    { path: "devices/tablets", element: <Tablets /> },
    { path: "devices/desktops", element: <Desktops /> },
    { path: "devices/projectors", element: <Projectors /> },
]

export default routes;