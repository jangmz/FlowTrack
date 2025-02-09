import { useMemo, useEffect } from "react";
import { useDeviceContext } from "../../context/DevicesContext";
import DeviceTable from "./DeviceTable";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Projectors() {
    const { devices, loading, error } = useDeviceContext();
    const { user } = useAuth();
    const navigate = useNavigate();

    // re-filter only when devices change
    const projectors = useMemo(() =>
        devices.filter(device => device.deviceType === "Projector"),
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
                    <h1>Projectors</h1>
                    <DeviceTable devices={projectors} />
                </>
            }
        </div>
    )
}