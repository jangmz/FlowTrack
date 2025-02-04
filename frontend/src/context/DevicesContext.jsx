import { useState, useEffect, useContext, createContext } from "react";
import fetchDevices from "../hooks/fetchDevices";

const DeviceContext = createContext();

export function useDeviceContext() {
    return useContext(DeviceContext);
}

export function DeviceProvider({ children }) {
    const {allDevices, loading, error} = fetchDevices();
    const [devices, setDevices] = useState(allDevices);
    
    // sort devices by type
    const [laptops, setLaptops] = useState([]);
    const [tablets, setTablets] = useState([]);
    const [desktops, setDesktops] = useState([]);
    const [projectors, setProjectors] = useState([]);

    useEffect(() => {
        let laptops = allDevices.filter(device => device.deviceType === "Laptop");
        let tablets = allDevices.filter(device => device.deviceType === "Tablet");
        let desktops = allDevices.filter(device => device.deviceType === "Desktop");
        let projectors = allDevices.filter(device => device.deviceType === "Projector");

        setLaptops(laptops);
        setTablets(tablets);
        setDesktops(desktops);
        setProjectors(projectors);
        setDevices(allDevices);

    }, [allDevices]);

    return (
        <DeviceContext.Provider value={{ 
            devices, 
            laptops,tablets, desktops, projectors,
            loading, 
            error 
        }}>
            { children }
        </DeviceContext.Provider>
    )
}