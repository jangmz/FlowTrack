import { useMemo, useEffect } from "react";
import { useDeviceContext } from "../../context/DevicesContext";
import DeviceTable from "./DeviceTable";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Tablets() {
    const { devices, loading, error } = useDeviceContext();
    const { user } = useAuth();
    const navigate = useNavigate();

    // re-filter only when devices change
    const tablets = useMemo(() =>
        devices.filter(device => device.deviceType === "Tablet"),
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
                    <h1>Tablets</h1>
                    <DeviceTable devices={tablets} />
                </>
            }
        </div>
    )
}