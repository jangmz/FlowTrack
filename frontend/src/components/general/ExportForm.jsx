import DropdownSelection from "./DropdownSelection";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload } from "react-icons/fa";

export default function ExportForm() {
    const [dataType, setDataType] = useState("devices");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) navigate("/log-in");
    }, [user]);

    function handleSubmit(e) {
        e.preventDefault();

        if (dataType === "clients") {
            console.log("Download clients");
            // call function in context
        } else if (dataType === "devices") {
            console.log("Download devices");
            // call function in context
        } else if (dataType === "all") {
            console.log("Download all data");
            // call function in context
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
            
            <form onSubmit={ handleSubmit } className="d-flex flex-column w-50 align-items-center">
                <DropdownSelection 
                    label={"Which data do you wish to download?"}
                    name={"dataType"}
                    optionValues={["devices", "clients", "all"]}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary d-flex gap-2 justify-content-center">
                    <FaDownload />
                    Download
                </button>
            </form>
        </div>
    )
}