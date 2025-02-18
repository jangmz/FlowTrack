import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDeviceContext } from "../../context/DevicesContext";
import { useAuth } from "../../context/AuthContext";
import { useClientContext } from "../../context/ClientsContext";
import FormInput from "../general/FormInput";
import DropdownSelection from "../general/DropdownSelection";
import { FaArrowCircleLeft, FaSave } from "react-icons/fa";
import { FaRotateLeft } from "react-icons/fa6";

const deviceTypes = [
    "Laptop",
    "Desktop",
    "Tablet",
    "Projector"
];

export default function EditDeviceForm() {
    const params = useParams();
    const navigate = useNavigate();
    const { clients } = useClientContext();
    const { devices, updateDevice } = useDeviceContext();
    const { user } = useAuth();
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

    function goBack() {
        const type = device.deviceType.toLowerCase();
        navigate(`/devices/${type}s`)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!device.client) { // when unassigning the client becomes undefined
            device.client = null;
            device.clientId = null;
            device.status === "Available";
        } else if (device.client) {
            device.client = clients.find(client => client.fullName === device.client) || null; // device.client -> full name, changed to client object, if not found "null" is assigned
            device.clientId = device.client ? device.client.id : null;
            device.status = device.clientId ? "Unavailable" : "Available"; // device status changed
        }
        
        console.log("Submitted device data:", device);

        try {
            const type = device.deviceType.toLowerCase();
            updateDevice(device);
            navigate(`/devices/${type}s`);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Edit {device.deviceType} {device.inventoryNumber}</h1>
            {
                error && <p className="alert alert-danger">{error}</p>
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
                    optionValues={deviceTypes}
                    selectValue={device.deviceType}
                    onChange={ handleChange }
                />
                {/* TODO: add status dropdown */}
                <div className="mb-3">
                    <label htmlFor="client">Client</label>
                    <select name="client" id="client" value={device.client?.fullName} onChange={ handleChange } className="form-select">
                        <option value={null} key={"null"}>No client</option>
                        {
                            clients.map((client) => (
                                <option value={client.fullName} key={client.id}>{client.fullName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="d-flex justify-content-between">
                    <button onClick={ goBack } type="button" className="btn btn-secondary d-flex align-items-center gap-2">
                        <FaArrowCircleLeft />
                        <span>Back</span>
                    </button>
                    <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center gap-2" style={{ "width": "200px"}}>
                        <FaSave />
                        <span>Save</span>
                    </button>
                    <button onClick={ revertData } type="button" className="btn btn-danger d-flex align-items-center gap-2">
                        <FaRotateLeft />
                        <span>Reset</span>
                    </button>
                </div>
            </form>
        </div>
    )
}