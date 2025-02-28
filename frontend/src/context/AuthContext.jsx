import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState();
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [arrErrors, setArrErrors] = useState([]); // for array of validation errors on sign up

    async function logIn(logInData) {
        console.log("User logging in...");

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/auth/log-in`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logInData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Error occured: ${errorData.error.message}`);
                throw new Error(errorData.error.message);
            }

            const data = await response.json();

            // save refresh and access token
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("accessToken", data.accessToken);
            setRefreshToken(data.refreshToken);

            // set user data
            const { id, username, role, email, fullName } = jwtDecode(data.refreshToken);
            setUser({ id, username, role, email, fullName });

            return true;
        } catch (error) {
            console.error(error);
            setError(error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function signUp(signUpData) {
        console.log("User signing up...");
        try {
            const response = await fetch(`${apiUrl}/auth/sign-up`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signUpData)
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (Array.isArray(errorData.errors)) {
                    console.error("Multiple errors: ", errorData.errors)
                    setArrErrors(errorData.errors);
                }

                throw new Error("Validation errors.");
            }

            const data = await response.json();
            console.log(data);
            return true;
        } catch (error) {
            console.error("Caught error:", error.message);
            return false;
        }
    }

    async function logOut() {
        console.log("User logging out...");
        try {
            // remove refresh token from DB
            const response = await fetch(`${apiUrl}/auth/log-out`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: refreshToken })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            // remove data from localStorage
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");

            // remove from context
            setUser(null);
            setRefreshToken("");

            console.log("User logged out.");
            return true;
        } catch (error) {
            console.error("Caught an error:", error.message);
            setError(error.message);
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ user, logIn, signUp, logOut, refreshToken, error, loading, arrErrors }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
}