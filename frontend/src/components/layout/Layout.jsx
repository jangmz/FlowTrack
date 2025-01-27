import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

export default function Layout() {
    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex">
                <SideMenu />
                <main className="flex-grow-1">
                    <Outlet />
                </main>
            </div>
        </>
    )
}