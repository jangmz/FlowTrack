import { useEffect, useState } from "react";
import { useClientContext } from "../../context/ClientsContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

export default function Clients() {
    const { clients, loading, deleteClient } = useClientContext();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);
    const [localErr, setLocalErr] = useState(null);

    useEffect(() => {
        if (!user) navigate("/log-in");
    }, []);

    // delete client
    async function handleDeleteClient(clientId) {
        try {
            await deleteClient(clientId);
            setSuccess("Client removed.");
        } catch (error) {
            setLocalErr(error.message);
        }
    }

    // edit client
    function handleEditClient(clientId) {
        setMessage("Editing a client data is currently unavailable.");
        //navigate(`clients/edit/${clientId}`);
    }

    return(
        <div className="container-fluid">
            {
                localErr &&
                <p className="alert alert-danger">{localErr}</p>
            }
            {
                success &&
                <p className="alert alert-success">{success}</p>
            }
            {
                message &&
                <p className="alert alert-info">{message}</p>
            }
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
                                <th scope="col" className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clients.map((client, index) => (
                                    <tr key={index}>
                                        <td>{client.id}</td>
                                        <td>{client.fullName}</td>
                                        <td>{client.email}</td>
                                        <td>
                                            <div className="d-flex gap-2 align-items-center justify-content-end">
                                                <button onClick={ (e) => handleEditClient(client.id) } className="btn btn-outline-primary d-flex align-items-center justify-content-center">
                                                    <FaRegEdit />
                                                </button>
                                                <button onClick={ (e) => handleDeleteClient(client.id) } className="btn btn-outline-danger d-flex align-items-center justify-content-center">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
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