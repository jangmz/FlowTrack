import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LogIn() {
    const navigate = useNavigate();
    const { logIn, error } = useAuth();
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
        console.log(logInUser);

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
            {
                localError && 
                <p className="alert alert-danger mt-4">{localError}</p>
            }
        </div>
    )
}