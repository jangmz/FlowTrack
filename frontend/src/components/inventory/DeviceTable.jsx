import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDeviceContext } from "../../context/DevicesContext";
import { useState } from "react";

export default function DeviceTable({ devices }) {
    const { updateDeviceStatus, deleteDevice } = useDeviceContext();
    const [ selectedDevices, setSelectedDevices] = useState([]);

    const statusVariant = {
        Available: "success",
        Unavailable: "danger",
        Rented: "warning",
        Reserved: "primary",
        Damaged: "dark",
        Unknown: "secondary",
    };
    
    // selecting a device
    function toggleDeviceSelection(deviceId) {
        setSelectedDevices((prev) =>
            prev.includes(deviceId)
                ? prev.filter((id) => id !== deviceId)
                : [...prev, deviceId]  
        );
    }

    // bulk status update
    function bulkUpdateStatus(newStatus) {
        selectedDevices.forEach((deviceId) => updateDeviceStatus(newStatus, deviceId));
        setSelectedDevices([]);
    }

    // button to delete device
    function handleDeleteDevice(deviceId) {
        deleteDevice(deviceId);
    }

    // changes device status
    function handleStatusChange(status, deviceId) {
        updateDeviceStatus(status, deviceId);
    }

    return (
        <>
            {
                selectedDevices.length > 0 &&
                <div className="alert alert-secondary d-flex justify-content-between align-items-center">
                    <span>{selectedDevices.length} devices selected</span>
                    <div>
                        {
                            Object.keys(statusVariant).map((status) => (
                                <button key={status} className={`btn btn${statusVariant[status]} me-2`} onClick={() => bulkUpdateStatus(status)}>
                                    Set {status}
                                </button>
                            ))
                        }
                        <button className="btn btn-danger" onClick={() => setSelectedDevices([])}>Cancel</button>
                    </div>
                </div>
            }
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th scope="col">
                            <input 
                                type="checkbox" 
                                onChange={(e) => setSelectedDevices(
                                    e.target.checked ? devices.map((d) => d.id) : []
                                )}
                                checked={selectedDevices.length === devices.length}
                            />
                        </th>
                        <th scope="col" className="text-start">Inventory number</th>
                        <th scope="col" className="text-start">Model</th>
                        <th scope="col" className="text-start">Status</th>
                        <th scope="col" className="text-start">User</th>
                        <th scope="col" className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        devices.map(device => (
                            <tr key={device.id} className="text-center">
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={selectedDevices.includes(device.id)}
                                        onChange={() => toggleDeviceSelection(device.id)}
                                    />
                                </td>
                                <td className="text-start">{device.inventoryNumber}</td>
                                <td className="text-start">{device.model}</td>
                                <td className="text-start">
                                    <Dropdown>
                                        <Dropdown.Toggle variant={statusVariant[device.status]} className="w-50">
                                            {device.status}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {
                                                Object.keys(statusVariant).map(status => (
                                                    <Dropdown.Item
                                                        key={status}
                                                        className={`mb-1 bg-${statusVariant[status]} text-white`}
                                                        onClick={() => updateDeviceStatus(status, device.id)}
                                                    >
                                                        {status}
                                                    </Dropdown.Item>
                                                ))
                                            }
                                            {/*<Dropdown.Item className="mb-1 bg-success text-white" onClick={() => handleStatusChange("Available", device.id)}>Available</Dropdown.Item>
                                            <Dropdown.Item className="mb-1 bg-danger text-white" onClick={() => handleStatusChange("Unavailable", device.id)}>Unavailable</Dropdown.Item>
                                            <Dropdown.Item className="mb-1 bg-warning text-dark" onClick={() => handleStatusChange("Rented", device.id)}>Rented</Dropdown.Item>
                                            <Dropdown.Item className="mb-1 bg-primary text-white" onClick={() => handleStatusChange("Reserved", device.id)}>Reserved</Dropdown.Item>
                                            <Dropdown.Item className="mb-1 bg-danger text-white" onClick={() => handleStatusChange("Damaged", device.id)}>Damaged</Dropdown.Item>
                                            <Dropdown.Item className="mb-1 bg-secondary text-light" onClick={() => handleStatusChange("Unknown", device.id)}>Unknown</Dropdown.Item>*/}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                <td className="text-start">{device.user ? device.user.fullName : "/"}</td>
                                <td>
                                    <div className="d-flex gap-2 align-items-center justify-content-end">
                                        <Link to={`/devices/laptops/${device.id}`}>
                                            <button className="btn btn-outline-primary d-flex align-items-center justify-cotnent-center"><FaRegEdit /></button>
                                        </Link>
                                        <button onClick={ (e) => handleDeleteDevice(device.id) } className="btn btn-outline-danger d-flex align-items-center justify-cotnent-center"><FaTrashAlt /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
        
    )
}