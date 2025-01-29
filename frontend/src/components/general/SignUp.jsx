import { useState } from "react"

export default function SignUp() {
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

    function handleSubmit(e) {
        e.preventDefault();
        console.log(signUpData);
        // TODO: call AuthContext for creating a user
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
        </div>
    )
}