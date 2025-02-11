import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDeviceContext } from "../../context/DevicesContext";
import { useAuth } from "../../context/AuthContext";
import FormInput from "../general/FormInput";
import DropdownSelection from "../general/DropdownSelection";

export default function EditDeviceForm() {
    const params = useParams();
    const navigate = useNavigate();
    const { devices, updateDevice } = useDeviceContext();
    const { user } = useAuth();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [device, setDevice] = useState(() => {
        const tempDevice = devices.filter(dev => dev.id === parseInt(params.deviceId));
        return tempDevice[0];
    });

    useEffect(() => {
        if (!user) navigate("/log-in");
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setDevice((prev) => ({...prev, [name]:[value]}));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Edited data:", device);
        // call updateDevice()
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Edit device [inventory number]</h1>
            {
                error && <p className="alert alert-danger">{error}</p>
            }
            {
                message && <p className="alert alert-success">{message}</p>
            }
            <form onSubmit={ handleSubmit } className="d-flex flex-column w-50">
                <FormInput 
                    inputName={"inventoryNumber"}
                    inputType={"number"}
                    labelText={"Inventory Number"}
                    inputValue={device.inventoryNumber}
                    onChange={ handleChange }
                />
                <FormInput 
                    inputName={"model"}
                    inputType={"text"}
                    labelText={"Model"}
                    inputValue={device.model}
                    onChange={ handleChange }
                />
                <FormInput 
                    inputName={"serialNumber"}
                    inputType={"text"}
                    labelText={"Serial Number"}
                    inputValue={device.serialNumber}
                    onChange={ handleChange }
                />
                <DropdownSelection 
                    label={"Device Type"}
                    name={"deviceType"}
                    selectValue={device.deviceType}
                    onChange={ handleChange }
                />
            </form>
        </div>
    )
}