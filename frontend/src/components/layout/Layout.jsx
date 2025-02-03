import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Layout() {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(user ? true : false);
    return (
        <>
            <Navbar />
            <div className="d-flex">
                {/* TODO: when user is signed in set "isSidebarOpen" to true */}
                {
                    user && 
                    <SideMenu isOpen={isSidebarOpen} toggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} />
                }
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