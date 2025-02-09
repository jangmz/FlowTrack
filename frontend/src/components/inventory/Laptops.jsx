import { useMemo, useEffect } from "react";
import DeviceTable from "./DeviceTable";
import { useDeviceContext } from "../../context/DevicesContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Laptops() {
    const { devices, loading, error } = useDeviceContext();
    const { user } = useAuth();
    const navigate = useNavigate();

    // re-filter only when devices change
    const laptops = useMemo(() =>
        devices.filter(device => device.deviceType === "Laptop"),
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
                    <h1>Laptops</h1>
                    {
                        loading && 
                        <p className="alert alert-info">
                            Please wait for the data to load...
                        </p>
                    }
                    {
                        error && 
                        <p className="alert alert-danger">
                            {error}
                        </p>
                    }
                    {<DeviceTable devices={laptops} />}
                </>
            }
        </div>
    )
}