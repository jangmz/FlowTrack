import { useMemo } from "react";
import { useDeviceContext } from "../../context/DevicesContext";
import DeviceTable from "./DeviceTable";

export default function Projectors() {
    const { devices, loading, error } = useDeviceContext();

    // re-filter only when devices change
    const projectors = useMemo(() =>
        devices.filter(device => device.deviceType === "Projector"),
        [devices]
    );

    console.log("Desktops:", projectors);
    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h1>Projectors</h1>
            <DeviceTable devices={projectors} />
        </div>
    )
}