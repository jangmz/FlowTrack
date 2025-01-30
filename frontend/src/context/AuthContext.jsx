import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState();
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
    const [error, setError] = useState(null);

    async function logIn(logInData) {
        console.log(JSON.stringify(logInData));
        
        try {
            const response = await fetch(`${apiUrl}/auth/log-in`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logInData)
            });

            if (!response.ok) {
                const data = await response.json();
                console.error(`Error occured: ${data.error.message}`);
                throw new Error("Failed to log in.");
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
            setError(error.message);
            return false;
        }
    }

    async function signUp(signUpData) {
        
    }

    return (
        <AuthContext.Provider value={{ user, logIn, signUp, refreshToken, accessToken, error }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
}