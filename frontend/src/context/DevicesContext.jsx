import { useState, useEffect, useContext, createContext } from "react";
import fetchDevices from "../hooks/fetchDevices";

const DeviceContext = createContext();

export function useDeviceContext() {
    return useContext(DeviceContext);
}

export function DeviceProvider({ children }) {
    const {allDevices, loading, error} = fetchDevices();
    const [devices, setDevices] = useState(allDevices);
    
    useEffect(() => {
        setDevices(allDevices);

    }, [allDevices]);

    return (
        <DeviceContext.Provider value={{ 
            devices, 
            loading, 
            error 
        }}>
            { children }
        </DeviceContext.Provider>
    )
}