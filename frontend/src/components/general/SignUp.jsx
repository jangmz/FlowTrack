import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
    const { signUp, arrErrors } = useAuth();
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        fullName: "",
        username: "",
        password1: "",
        password2: "",
        email: "",
        role: "user"
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(signUpData);
        
        try {
            const success = await signUp(signUpData);
            success && navigate("/log-in");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Sign Up</h1>
            <form className="d-flex flex-column w-50" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full name</label>
                    <input type="text" name="fullName" id="fullName" className="form-control" required onChange={(e) => handleChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" name="username" id="username" className="form-control" required onChange={(e) => handleChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input type="password" name="password1" id="password1" className="form-control" required onChange={(e) => handleChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Repeat password</label>
                    <input type="password" name="password2" id="password2" className="form-control" required onChange={(e) => handleChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" id="email" className="form-control" required onChange={(e) => handleChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select name="role" id="role" value={signUpData.role} className="form-control" required onChange={(e) => handleChange(e)}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            
            {
                // displays validation errors from the server
                arrErrors.length > 0 &&
                <ul className="list-group mt-3">
                    {arrErrors.map((error, index) => (
                        <li key={index} className="list-group-item list-group-item-danger" >{error.msg}</li>
                    ))}
                </ul>
            }
            
        </div>
    )
}