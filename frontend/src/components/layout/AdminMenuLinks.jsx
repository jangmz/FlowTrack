import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

// TODO: search functionality
// TODO: how to display errors on logout if they occur

export default function AdminMenuLinks() {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    async function handleLogOut(e) {
        e.preventDefault();

        try {
            const success = await logOut();
            success && navigate("/log-in");
        } catch (error) {
            console.error(error);
            alert(error.message); // alert not working
        }
    }

    return (
        <div className="d-flex justify-content-between w-100">
            <form role="search" style={{"width": "400px"}}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
            <div className="d-flex gap-3 align-items-center">
                <div className="nav-item">
                    <h6 className="text-white m-0">Hello, {user.fullName}</h6>
                </div>
                <div className="nav-item">
                    <button onClick={(e) => handleLogOut(e)}className="btn btn-secondary d-flex align-items-center">
                        <FiLogOut />
                        <span className="ms-1">Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    )
}