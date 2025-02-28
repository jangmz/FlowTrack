import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LogIn() {
    const navigate = useNavigate();
    const { logIn, error, loading } = useAuth();
    const [localError, setLocalError] = useState();
    const [logInUser, setlogInUser] = useState({
        username: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setlogInUser({ ...logInUser, [name]: value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const success = await logIn(logInUser);

            // TODO: does not navigate on success
            success ? navigate("/") : setLocalError(error || "Invalid username/password.");
        } catch (error) {
            console.error(error);
            setLocalError(error.message);
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Log In</h1>
            {
                loading &&
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="spinner-border m-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="alert alert-info text-center" role="alert">
                        <p className="m-0">
                            Please wait about 1 min for backend to start up as it is hosted on a service that puts application to sleep during periods of inactivity.
                        </p>
                        <p className="m-0">
                            After start up, everything will work normally.
                        </p>
                    </div>
                </div>
            }
            {
                localError && 
                <p className="alert alert-danger mt-3">{localError}</p>
            }
            <form className="d-flex flex-column w-50" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" name="username" id="username" className="form-control" required onChange={(e) => handleChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id="password" className="form-control" required onChange={(e) => handleChange(e)}/>
                </div>
                <button type="submit" className="btn btn-primary" >Log In</button>
            </form>
            <p className="alert alert-info text-center mt-4">
                To test the application, log in with these administrative credentials: 
                <ul>
                    <li>Username: guest</li>
                    <li>Password: Guest2025!</li>
                </ul>
            </p>
        </div>
    )
}