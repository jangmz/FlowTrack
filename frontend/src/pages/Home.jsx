import DeviceOverviewCard from "../components/inventory/DeviceOverviewCard"
import laptopIcon from "../assets/icons/laptop.png";
import desktopIcon from "../assets/icons/desktop.png";
import tabletIcon from "../assets/icons/tablet.png";
import projectorIcon from "../assets/icons/projector.png";
import printerIcon from "../assets/icons/printer.png";
import monitorIcon from "../assets/icons/monitor.png";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    useEffect(() => {
        if (!user) {
            navigate("/log-in");
        }
    }, []);

    return (
        <div className="cotnainer-fluid d-flex flex-column align-items-center">
            <h1>Devices Overview Cards</h1>
            <div className="container-fluid d-flex flex-wrap">
                <DeviceOverviewCard title={"Laptops"} icon={laptopIcon} stock={stock} />
                <DeviceOverviewCard title={"Desktops"} icon={desktopIcon} stock={stock} />
                <DeviceOverviewCard title={"Tablets"} icon={tabletIcon} stock={stock} />
                <DeviceOverviewCard title={"Projectors"} icon={projectorIcon} stock={stock} />
                <DeviceOverviewCard title={"Monitors"} icon={monitorIcon} stock={stock} />
                <DeviceOverviewCard title={"Printers"} icon={printerIcon} stock={stock} />
            </div>
        </div>
    )
}