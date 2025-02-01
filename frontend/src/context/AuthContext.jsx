import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState();
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
    const [error, setError] = useState(null);
    const [arrErrors, setArrErrors] = useState([]); // for array of validation errors on sign up

    async function logIn(logInData) {
        console.log("User logging in...");
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
            setAccessToken(data.accessToken);

            // set user data
            const { id, username, role, email, fullName } = jwtDecode(data.refreshToken);
            setUser({ id, username, role, email, fullName });

            return true;
        } catch (error) {
            console.error(error);
            setError(error);
            return false;
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

    return (
        <AuthContext.Provider value={{ user, logIn, signUp, refreshToken, accessToken, error, arrErrors }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
}