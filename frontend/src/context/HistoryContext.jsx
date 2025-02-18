import { useContext, createContext, useState, useEffect } from "react";
import { isTokenExpired, refreshAccessToken } from "../utility/tokenUtility";
import { useAuth } from "./AuthContext";
import { fetchHistory } from "../hooks/fetchHistory";

const HistoryContext = createContext();

export function useHistoryContext() {
    return useContext(HistoryContext);
}

export function HistoryProvider({ children }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { user } = useAuth();
    const [historyLog, setHistoryLog] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) loadHistory();
    }, [user]);

    // fetch history and update state
    async function loadHistory() {
        try {
            setLoading(true);
            const historyData = await fetchHistory();
            setHistoryLog(historyData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // token expiry check
    async function checkToken() {
        const accessToken = localStorage.getItem("accessToken");
        if (isTokenExpired(accessToken)) {
            console.log("Current token is expired, renewing...");
            try {
                await refreshAccessToken();
                console.log("Token renewed.");
            } catch (error) {
                console.error("Error caught:", error.message);
            }
        }
    }

    // creating new history entry
    async function insertHistoryLog(historyLog) {
        await checkToken();
        console.log("Adding new client to the database...");
        setLoading(true)

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${apiUrl}/api/history`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(historyLog)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || errData.message);
            }

            // refresh client list
            await loadHistory();

            console.log("History log added, state updated.");
        } catch (error) {
            console.error("Caught error:", error.message);
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <HistoryContext.Provider value={{
            historyLog,
            loading,
            error,
            insertHistoryLog
        }}>
            { children }
        </HistoryContext.Provider>
    )
}