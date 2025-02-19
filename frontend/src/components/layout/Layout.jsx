import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Layout() {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(user ? window.innerWidth > 800 : false);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 800) {
                setIsSidebarOpen(false); // hides on smaller screens
            } else if (user) {
                setIsSidebarOpen(true); // shown on larger screens when user is logged in
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // run once on component mount

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [user]);

    function toggleButton() {
        setIsSidebarOpen((prev) => !prev);
    }

    return (
        <>
            <Navbar />
            <div className="d-flex">
                {
                    user && 
                    <SideMenu isOpen={isSidebarOpen} toggleMenu={toggleButton} />
                }
                <main 
                    className="flex-grow-1"
                    style={{
                        marginLeft: isSidebarOpen && user ? "250px" : "0",
                        marginTop: "56px",
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