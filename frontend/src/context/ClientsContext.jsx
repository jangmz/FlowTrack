import { useContext, createContext, useState, useEffect } from "react";
import { fetchClients } from "../hooks/fetchClients";
import { isTokenExpired, refreshAccessToken } from "../utility/tokenUtility";
import { useAuth } from "./AuthContext";

const ClientsContext = createContext();

export function useClientContext() {
    return useContext(ClientsContext);
}

export function ClientsProvider({ children }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { user } = useAuth();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) loadClients();
    }, [user]);

    // fetch clients and update state
    async function loadClients() {
        try {
            setLoading(true);
            const allClients = await fetchClients();
            setClients(allClients);
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
                //const newAT = localStorage.getItem("accessToken");
                //setAccessToken(newAT);
                console.log("Token renewed.");
            } catch (error) {
                console.error("Error caught:", error.message);
            }
        }
    }

    // creating new client
    async function createClient(client) {
        await checkToken();
        console.log("Adding new client to the database...");
        setLoading(true)

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${apiUrl}/api/clients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(client)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || errData.message);
            }

            // refresh client list
            await loadClients();

            console.log("Client added, state updated.");
        } catch (error) {
            console.error("Caught error:", error.message);
            return new Error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // delete a client
    async function deleteClient(clientId) {
        await checkToken();
        console.log("Deleting a client...");

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${apiUrl}/api/clients/${clientId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${accessToken}`}
            });


            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || errData.message);
            }

            // refresh client list
            await loadClients();

            console.log("Client deleted.");
        } catch (error) {
            console.error("Caught error:", error.message);
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // importing client data
    async function importClients(formData) {
        await checkToken();
        console.log("Uploading data...");

        try {
            const at = localStorage.getItem("accessToken");
            const response = await fetch(`${apiUrl}/api/clients/import`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${at}` },
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || errData.message);
            }

            await loadClients(); // refresh context data
            console.log("Data imported, state updated.");
        } catch (error) {
            console.error("Caught error:", error.message);
            throw error.message;
        }
    }

    // exporting client data
    async function exportClients() {
        await checkToken();
        console.log("Exporting data from the database...");

        try {
            const at = localStorage.getItem("accessToken");
            const response = await fetch(`${apiUrl}/api/clients/export`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${at}` }
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || errData.message);
            }

            // converting response to blob
            const blob = await response.blob();

            // create URL for the file and trigger download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "clients_export.csv";
            document.body.appendChild(a);
            a.click();

            // clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            console.log("Data exported and downloaded.");
        } catch (error) {
            console.error("Caught error:", error.message);
            throw error.message;
        }
    }

    return (
        <ClientsContext.Provider value={{
            clients,
            loading,
            error,
            createClient,
            deleteClient,
            importClients,
            exportClients
        }}>
            { children }
        </ClientsContext.Provider>
    )
}