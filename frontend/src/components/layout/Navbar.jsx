import Logo from "../../../../Logo/FlowTrackLogo4.png";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={Logo} alt="FlowTrack logo" width="30" height="auto"/>
                    FlowTrack
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/sign-up">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/log-in">Log In</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}