import Logo from "../../../../Logo/FlowTrackLogo4.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminMenuLinks from "./AdminMenuLinks";
import GuestMenuLinks from "./GuestMenuLinks";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center gap-2" href="/">
                    <img src={Logo} alt="FlowTrack logo" width="30" height="auto"/>
                    <span className="text-white fw-bold">FlowTrack</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    {
                        user 
                        ? <AdminMenuLinks />
                        : <GuestMenuLinks />
                    }
                </div>
            </div>
        </nav>
    )
}