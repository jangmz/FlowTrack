import DropdownSelection from "./DropdownSelection";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { useDeviceContext } from "../../context/DevicesContext";
import { useClientContext } from "../../context/ClientsContext";

export default function ExportForm() {
    const [dataType, setDataType] = useState("devices");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { user } = useAuth();
    const { exportDevices } = useDeviceContext();
    const { exportClients } = useClientContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) navigate("/log-in");
    }, [user]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (dataType === "clients") {
                console.log("Download clients");
                await exportClients();
            } else if (dataType === "devices") {
                console.log("Download devices");
                await exportDevices();
            } else if (dataType === "all") {
                console.log("Download all data");
                await exportClients();
                await exportDevices();
            }
            setSuccess("Data exported and downloaded.");
        } catch (error) {
            setError(error);
        }
        
    }

    function handleChange(e) {
        const { value } = e.target;
        setDataType(prev => prev = value);
    }
    return (
        <div className="container d-flex flex-column align-items-center">
            <h1 className="text-center mb-3">
                Data Export
            </h1>
            {
                error && 
                <p className="alert alert-danger">{error}</p>
            }
            {
                success &&
                <p className="alert alert-success">{success}</p>
            }
            <form onSubmit={ handleSubmit } className="d-flex flex-column w-50 align-items-center">
                <DropdownSelection 
                    label={"Which data do you wish to download?"}
                    name={"dataType"}
                    optionValues={["devices", "clients", "all"]}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary d-flex gap-2 justify-content-center align-items-center">
                    <FaDownload />
                    Download
                </button>
                
            </form>
        </div>
    )
}