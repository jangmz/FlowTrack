import { useEffect, useState } from "react";
import { useClientContext } from "../../context/ClientsContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Clients() {
    const { clients, loading } = useClientContext();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/log-in");
    }, []);

    return(
        <div className="container-fluid">
            {
                loading &&
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="spinner-border m-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {
                user &&
                <>
                    <h1 className="text-center">Clients</h1>
                    <table className="table">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">ID</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clients.map((client, index) => (
                                    <tr key={index}>
                                        <td>{client.id}</td>
                                        <td>{client.fullName}</td>
                                        <td>{client.email}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}