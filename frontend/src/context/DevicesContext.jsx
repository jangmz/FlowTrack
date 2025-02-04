import { useState, useEffect, useContext, createContext } from "react";
import fetchDevices from "../hooks/fetchDevices";
import { isTokenExpired, refreshAccessToken } from "../utility/tokenUtility";

const DeviceContext = createContext();

export function useDeviceContext() {
    return useContext(DeviceContext);
}

export function DeviceProvider({ children }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
    const {allDevices, loading, error} = fetchDevices();
    const [devices, setDevices] = useState(allDevices);
    
    useEffect(() => {
        setDevices(allDevices);

    }, [allDevices]);

    // token expiry check
    async function checkToken() {
        if (isTokenExpired(accessToken)) {
            console.log("Current token is expired, renewing...");
            try {
                await refreshAccessToken();
                const newAT = localStorage.getItem("accessToken");
                setAccessToken(newAT);
                console.log("Token renewed.");
            } catch (error) {
                console.error("Error caught:", error.message);
            }
        }
    }

    // device status update
    async function updateDeviceStatus(status, deviceId) {
        await checkToken();

        const deviceData = devices.find(device => device.id === deviceId);
        deviceData.status = status;

        try {
            const response = await fetch(`${apiUrl}/api/devices/${deviceId}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(deviceData)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message);
            }

            const resData = await response.json();

            // update state by going through all devices and finding the one that matches the ID
            setDevices(prev => prev.map(device => device.id === resData.id ? resData : device));
        } catch (error) {
            console.error("Caught error:", error.message);
            return new Error(error.message);
        }
    }

    return (
        <DeviceContext.Provider value={{ 
            devices, 
            loading, 
            error,
            updateDeviceStatus
        }}>
            { children }
        </DeviceContext.Provider>
    )
}