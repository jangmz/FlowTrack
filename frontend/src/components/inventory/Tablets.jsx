import { useMemo } from "react";
import { useDeviceContext } from "../../context/DevicesContext";
import DeviceTable from "./DeviceTable";

export default function Tablets() {
    const { devices, loading, error } = useDeviceContext();

    // re-filter only when devices change
    const tablets = useMemo(() =>
        devices.filter(device => device.deviceType === "Tablet"),
        [devices]
    );

    console.log("Tablets:", tablets);
    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h1>Tablets</h1>
            <DeviceTable devices={tablets} />
        </div>
    )
}