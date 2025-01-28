import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useState } from "react";

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <>
            <Navbar />
            <div className="d-flex">
                <SideMenu isOpen={isSidebarOpen} toggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main 
                    className="flex-grow-1"
                    style={{
                        marginLeft: isSidebarOpen ? "250px" : "0",
                        transition: "margin-left 0.3s ease",
                        padding: "1rem",
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </>
    )
}