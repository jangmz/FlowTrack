import { isTokenExpired, refreshAccessToken } from "../utility/tokenUtility";

export async function fetchClients() {
    const apiUrl = import.meta.env.VITE_API_URL;
    let token = localStorage.getItem("accessToken");

    try {
        console.log("Checking token expiration...");
        if (isTokenExpired(token)) {
            console.log("Current token is expired, renewing...");
            await refreshAccessToken();
            token = localStorage.getItem("accessToken");
        }

        const response = await fetch(`${apiUrl}/api/clients`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error("Failed fetching data from API.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
}