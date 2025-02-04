import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
    if (!token) return true;

    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000; // current time in seconds

    return exp < currentTime;
}

export async function refreshAccessToken() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("refreshToken");

    if (!token) throw new Error("Refresh token is not available.");

    try {
        const response = await fetch(`${apiUrl}/auth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        });

        if (!response.ok) throw new Error("Error retrieving new token.");

        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export function checkAndUpdateToken(token) {
    if (isTokenExpired(token)) {
        console.log("Token expired, renewing...");
        try {
            refreshAccessToken();
            console.log("Token renewed.");
        } catch (error) {
            console.error("Error occured: ", error.message);
            return false;
        }
    }

    console.log("Token is valid.");
    return true;
}