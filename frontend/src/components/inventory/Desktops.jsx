import { useMemo, useEffect } from "react";
import DeviceTable from "./DeviceTable";
import { useDeviceContext } from "../../context/DevicesContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Desktops() {
    const { devices, loading, error } = useDeviceContext();
    const { user } = useAuth();
    const navigate = useNavigate();

    // re-filter only when devices change
    const desktops = useMemo(() =>
        devices.filter(device => device.deviceType === "Desktop"),
        [devices]
    );

    useEffect(() => {
        if (!user) {
            navigate("/log-in");
        }
    }, []);

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            {
                user && 
                <>
                    <h1>Desktops</h1>
                    <DeviceTable devices={desktops} />
                </>
            }
        </div>
    )
}