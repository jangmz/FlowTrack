import Home from "./pages/Home";
import SignUp from "./components/general/SignUp";
import LogIn from "./components/general/LogIn";
import Laptops from "./components/inventory/Laptops";
import Tablets from "./components/inventory/Tablets";
import Desktops from "./components/inventory/Desktops";
import Projectors from "./components/inventory/Projectors";
import NewDeviceForm from "./components/inventory/NewDeviceForm";
import EditDeviceForm from "./components/inventory/EditDeviceForm";
import Clients from "./components/general/Clients";
import NewClientForm from "./components/general/NewClientForm";
import History from "./pages/History";
import ImportForm from "./components/general/ImportForm";
import ExportForm from "./components/general/ExportForm";

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
    { path: "clients", element: <Clients /> },
    { path: "clients/new", element: <NewClientForm /> },
    { path: "history", element: <History /> },
    { path: "import", element: <ImportForm /> },
    { path: "export", element: <ExportForm /> }
]

export default routes;