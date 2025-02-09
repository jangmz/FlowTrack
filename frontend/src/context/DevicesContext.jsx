import { useState, useEffect, useContext, createContext } from "react";
import fetchDevices from "../hooks/fetchDevices";
import { isTokenExpired, refreshAccessToken } from "../utility/tokenUtility";

const DeviceContext = createContext();

export function useDeviceContext() {
    return useContext(DeviceContext);
}

export function DeviceProvider({ children }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { allDevices, loading, error } = fetchDevices();
    const [devices, setDevices] = useState(allDevices);
    
    useEffect(() => {
        setDevices(allDevices);

    }, [allDevices]);

    // token expiry check
    async function checkToken() {
        const accessToken = localStorage.getItem("accessToken");
        if (isTokenExpired(accessToken)) {
            console.log("Current token is expired, renewing...");
            try {
                await refreshAccessToken();
                //const newAT = localStorage.getItem("accessToken");
                //setAccessToken(newAT);
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
            const accessToken = localStorage.getItem("accessToken");
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

    // add new device
    async function addNewDevice(newDevice) {
        await checkToken();

        console.log("Adding new device to the database...");

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${apiUrl}/api/devices`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(newDevice)
            });

            if (!response.ok) {
                const errData = await response.json();
                //console.log(errData.error.message);

                let serverErr;
                errData.error 
                ? serverErr = new Error(errData.error.message)
                : serverErr = new Error(errData.message);
                
                throw serverErr;
            }

            const resData = await response.json();

            // update state
            setDevices(prevDevices => [...prevDevices, resData]);
        } catch (error) {
            console.error("Caught error:", error.message);
            throw new Error(error.message);
        }
    }

    // delete device
    async function deleteDevice(deviceId) {
        await checkToken();

        console.log(`Deleting device with ID: ${deviceId}`);

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${apiUrl}/api/devices/${deviceId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                const errData = await response.json();
                //console.log(errData.error.message);

                let serverErr;
                errData.error 
                ? serverErr = new Error(errData.error.message)
                : serverErr = new Error(errData.message);
                
                throw serverErr;
            }

            const resData = await response.json();

            // update state -> return all except the removed one
            setDevices(prevDevices => 
                prevDevices.filter(device => device.id !== deviceId)
            );
            console.log("Device deleted, state updated.");
        } catch (error) {
            console.error("Caught error:", error.message);
            throw new Error(error.message);
        }
    }

    return (
        <DeviceContext.Provider value={{ 
            devices, 
            loading, 
            error,
            updateDeviceStatus,
            addNewDevice,
            deleteDevice,
        }}>
            { children }
        </DeviceContext.Provider>
    )
}