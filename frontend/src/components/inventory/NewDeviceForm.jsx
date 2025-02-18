import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../general/FormInput";
import DropdownSelection from "../general/DropdownSelection";
import { useDeviceContext } from "../../context/DevicesContext";
import { useAuth } from "../../context/AuthContext";

const deviceTypes = [
    "Laptop",
    "Desktop",
    "Tablet",
    "Projector"
];

export default function NewDeviceForm() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addNewDevice } = useDeviceContext();
    const [error, setError] = useState(null);
    const [confirmation, setConfirmation] = useState(null);
    const [newDevice, setNewDevice] = useState({
        deviceType: "Laptop",
        inventoryNumber: 0,
        model: "",
        serialNumber: "",
        status: "Available"
    });

    useEffect(() => {
        if (!user) {
            navigate("/log-in");
        }
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setNewDevice(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await addNewDevice(newDevice);
            setConfirmation("New device added successfully.");
            setNewDevice({
                deviceType: "Laptop",
                inventoryNumber: 0,
                model: "",
                serialNumber: "",
                status: "Available"
            })
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            {
                user &&
                <>
                    <h1>Add new device</h1>
                    {
                        error &&
                        <p className="alert alert-danger">{error}</p>
                    }
                    {
                        confirmation &&
                        <p className="alert alert-success">{confirmation}</p>
                    }
                    <form onSubmit={ handleSubmit } className="d-flex flex-column w-50">
                        <FormInput 
                            inputName={"inventoryNumber"}
                            inputType={"number"}
                            labelText={"Inventory number"}
                            inputValue={newDevice.inventoryNumber}
                            onChange={ handleChange }
                        />
                        <FormInput
                            inputName={"model"}
                            inputType={"text"}
                            labelText={"Device model"}
                            inputValue={newDevice.model}
                            onChange={ handleChange }
                        />
                        <FormInput
                            inputName={"serialNumber"}
                            inputType={"text"}
                            labelText={"Serial number"}
                            inputValue={newDevice.serialNumber}
                            onChange={ handleChange }
                        />
                        <DropdownSelection 
                            label={"Device type"}
                            name={"deviceType"}
                            selectValue={newDevice.deviceType}
                            optionValues={deviceTypes}
                            onChange={ handleChange }
                        />
                        <button type="submit" className="btn btn-primary">
                            Add new device
                        </button>
                    </form>
                </>
            }
        </div>
    );
}