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
    const originalDevice = devices.find(dev => dev.id === parseInt(params.deviceId));
    const [device, setDevice] = useState(originalDevice);

    useEffect(() => {
        if (!user) navigate("/log-in");
        console.log(device);
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setDevice((prev) => ({...prev, [name]: value}));
    }

    function revertData() {
        setDevice(originalDevice);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (updateDevice()) {
                setMessage("Data successfully updated.");
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Edit {device.deviceType} {device.inventoryNumber}</h1>
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
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                    <button onClick={ revertData } type="button" className="btn btn-danger">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}