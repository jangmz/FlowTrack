import { useMemo } from "react";
import DeviceTable from "./DeviceTable";
import { useDeviceContext } from "../../context/DevicesContext";

export default function Desktops() {
    const { devices, loading, error } = useDeviceContext();

    // re-filter only when devices change
    const desktops = useMemo(() =>
        devices.filter(device => device.deviceType === "Desktop"),
        [devices]
    );

    console.log("Projectors:", desktops);

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h1>Desktops</h1>
            <DeviceTable devices={desktops} />
        </div>
    )
}