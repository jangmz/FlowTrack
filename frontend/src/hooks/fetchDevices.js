/*import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { isTokenExpired, refreshAccessToken } from "../utility/tokenUtility";

export default function fetchDevices() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { user } = useAuth();
    const [allDevices, setAllDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                let token = localStorage.getItem("accessToken");

                // token expiration
                console.log("Checking token expiration...");
                if (isTokenExpired(token)) {
                    console.log("Current token is expired, renewing...");
                    await refreshAccessToken();
                    token = localStorage.getItem("accessToken");
                    //setAccessToken(token);
                }

                const response = await fetch(`${apiUrl}/api/devices`, {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`}
                });

                if (!response.ok) {
                    throw new Error("Failed fetching data from API.");
                }

                const data = await response.json();
                setAllDevices(data);
            } catch (error) {
                console.error("Error caught:", error);
                setError(error.message);
            } finally {
                setLoading(false);
                setError(null);
            }
        }

        fetchData();
    }, [user])

    return { allDevices, loading, error };
}
    */
import { isTokenExpired, refreshAccessToken } from "../utility/tokenUtility";

export async function fetchDevices() {
    const apiUrl = import.meta.env.VITE_API_URL;
    let token = localStorage.getItem("accessToken");

    try {
        console.log("Checking token expiration...");
        if (isTokenExpired(token)) {
            console.log("Current token is expired, renewing...");
            await refreshAccessToken();
            token = localStorage.getItem("accessToken");
        }

        const response = await fetch(`${apiUrl}/api/devices`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error("Failed fetching data from API.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
}
