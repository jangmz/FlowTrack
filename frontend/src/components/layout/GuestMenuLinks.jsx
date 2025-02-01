import { Link } from "react-router-dom";

export default function GuestMenuLinks() {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link text-white" to="/sign-up">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-white" to="/log-in">Log In</Link>
            </li>
        </ul>
    )
}