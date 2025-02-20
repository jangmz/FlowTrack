import FormInput from "./FormInput";
import DropdownSelection from "./DropdownSelection";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";

export default function ImportForm() {
    const [dataType, setDataType] = useState("devices");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) navigate("/log-in");
    }, [user]);

    function handleSubmit(e) {
        e.preventDefault();

        if (dataType === "clients") {
            console.log("Submitted clients");
            // call function in context
        } else if (dataType === "devices") {
            console.log("Submitted devices");
            // call function in context
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