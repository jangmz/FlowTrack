import { useState } from "react"

export default function LogIn() {
    const [logInUser, setlogInUser] = useState({
        username: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setlogInUser({ ...logInUser, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(logInUser);
        // TODO: call AuthContext for user authentication
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
        </div>
    )
}