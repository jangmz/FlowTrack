import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import laptopIcon from "../assets/icons/laptop.png";
import desktopIcon from "../assets/icons/desktop.png";
import tabletIcon from "../assets/icons/tablet.png";
import projectorIcon from "../assets/icons/projector.png";
import printerIcon from "../assets/icons/printer.png";
import monitorIcon from "../assets/icons/monitor.png";
import DeviceOverviewCard from "../components/inventory/DeviceOverviewCard"
import { useAuth } from "../context/AuthContext";
import { useDeviceContext } from "../context/DevicesContext";

const stock = {
    available: 9,
    unavailable: 33,
    rented: 20,
    unknown: 2,
    reserved: 2,
    damaged: 1,
    total: 120
}

export default function Home() {
    // TODO: count device statuses from DB
    const { user } = useAuth();
    const navigate = useNavigate();
    const { countDeviceStatuses } = useDeviceContext();

    const laptopStock = countDeviceStatuses("Laptop");
    const desktopStock = countDeviceStatuses("Desktop");
    const tabletStock = countDeviceStatuses("Tablet");
    const projectorStock = countDeviceStatuses("Projector");

    useEffect(() => {
        if (!user) {
            navigate("/log-in");
        }
    }, []);

    return (
        <div className="cotnainer-fluid d-flex flex-column align-items-center">
            {
                user &&
                <>
                    <h1>Devices Overview Cards</h1>
                    <div className="container-fluid d-flex flex-wrap">
                        <DeviceOverviewCard title={"Laptops"} icon={laptopIcon} stock={laptopStock} />
                        <DeviceOverviewCard title={"Tablets"} icon={tabletIcon} stock={tabletStock} />
                        <DeviceOverviewCard title={"Desktops"} icon={desktopIcon} stock={desktopStock} />
                        <DeviceOverviewCard title={"Projectors"} icon={projectorIcon} stock={projectorStock} />
                        {/*<DeviceOverviewCard title={"Monitors"} icon={monitorIcon} stock={stock} />*/}
                        {/*<DeviceOverviewCard title={"Printers"} icon={printerIcon} stock={stock} />*/}
                    </div>
                </>
            }
        </div>
    )
}