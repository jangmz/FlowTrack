import FormInput from "./FormInput";
import DropdownSelection from "./DropdownSelection";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { useClientContext } from "../../context/ClientsContext";
import { useDeviceContext } from "../../context/DevicesContext";

export default function ImportForm() {
    const [dataType, setDataType] = useState("devices");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { importClients } = useClientContext();
    const { importDevices } = useDeviceContext();

    useEffect(() => {
        if(!user) navigate("/log-in");
    }, [user]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const formData = new FormData();
            const fileInput = e.target.elements.file;
            const file = fileInput.files[0];

            if (!file) {
                throw new Error("No file selected.");
            }

            formData.append("file", file);

            if (dataType === "clients") {
                // import clients to DB
                await importClients(formData);
            } else if (dataType === "devices") {
                // import devices to DB
                await importDevices(formData);
            }
            setError(prev => prev = null);
            setSuccess("Data successfully imported.");
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
            <h1 className="text-center">
                Data Import
            </h1>
            {
                error &&
                <p className="alert alert-danger">{error}</p>
            }
            {
                success &&
                <p className="alert alert-success">{success}</p>
            }
            <form onSubmit={ handleSubmit } encType="multipart/form-data" className="d-flex flex-column w-50">
                <FormInput 
                    labelText={"CSV File"}
                    inputName={"file"}
                    inputType={"file"}
                />
                <DropdownSelection 
                    label={"What data will you upload?"}
                    name={"dataType"}
                    optionValues={["devices", "clients"]}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary d-flex gap-2 justify-content-center">
                    <FaUpload />
                    Upload
                </button>
            </form>
            <div className="container mt-5">
                <h4>Instructions</h4>
                <ol>
                    <li>Only CSV files will work</li>
                    <li>CSV files must contain these headers:</li>
                    <ul>
                        <li>Devices: inventoryNumber, deviceType, model, serialNumber (optional), status</li>
                        <ul>
                            <li>deviceType: Laptop, Tablet, Desktop, Projector</li>
                            <li>status: Available, Unavailable, Rented, Damaged, Reserved, Unknown</li>
                        </ul>
                        <li>Clients: fullName, email</li>
                    </ul>
                    <li>Choose what type of data are you uploading</li>
                </ol>
            </div>
        </div>
    )
}