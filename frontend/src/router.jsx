import Home from "./pages/Home";
import SignUp from "./components/general/SignUp";
import LogIn from "./components/general/LogIn";
import Laptops from "./components/inventory/Laptops";
import Tablets from "./components/inventory/Tablets";
import Desktops from "./components/inventory/Desktops";
import Projectors from "./components/inventory/Projectors";
import NewDeviceForm from "./components/inventory/NewDeviceForm";
import EditDeviceForm from "./components/inventory/EditDeviceForm";

const routes = [
    { index: true, element: <Home /> }, // renders at "/"
    { path: "sign-up", element: <SignUp /> },
    { path: "log-in", element: <LogIn /> },
    { path: "devices/laptops", element: <Laptops /> },
    { path: "devices/tablets", element: <Tablets /> },
    { path: "devices/desktops", element: <Desktops /> },
    { path: "devices/projectors", element: <Projectors /> },
    { path: "devices/new", element: <NewDeviceForm /> },
    { path: "devices/edit/:deviceId", element: <EditDeviceForm /> },
]

export default routes;