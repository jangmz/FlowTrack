import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDeviceContext } from "../../context/DevicesContext";

export default function DeviceTable({ devices }) {
    const { updateDeviceStatus, deleteDevice } = useDeviceContext();
    const statusVariant = {
        Available: "success",
        Unavailable: "danger",
        Rented: "warning",
        Reserved: "primary",
        Damaged: "dark",
        Unknown: "secondary",
    };

    // TODO: remove device from DB & context
    function handleDeleteDevice(deviceId) {
        console.log("Device removed: ", deviceId);
        deleteDevice(deviceId);
    }

    function handleStatusChange(status, deviceId) {
        updateDeviceStatus(status, deviceId);
    }

    return (
        <table className="table">
            <thead>
                <tr className="text-center">
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
                            <td className="text-start">{device.inventoryNumber}</td>
                            <td className="text-start">{device.model}</td>
                            <td className="text-start">
                                <Dropdown>
                                    <Dropdown.Toggle variant={statusVariant[device.status]} className="w-50">
                                        {device.status}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="mb-1 bg-success text-white" onClick={() => handleStatusChange("Available", device.id)}>Available</Dropdown.Item>
                                        <Dropdown.Item className="mb-1 bg-danger text-white" onClick={() => handleStatusChange("Unavailable", device.id)}>Unavailable</Dropdown.Item>
                                        <Dropdown.Item className="mb-1 bg-warning text-dark" onClick={() => handleStatusChange("Rented", device.id)}>Rented</Dropdown.Item>
                                        <Dropdown.Item className="mb-1 bg-primary text-white" onClick={() => handleStatusChange("Reserved", device.id)}>Reserved</Dropdown.Item>
                                        <Dropdown.Item className="mb-1 bg-danger text-white" onClick={() => handleStatusChange("Damaged", device.id)}>Damaged</Dropdown.Item>
                                        <Dropdown.Item className="mb-1 bg-secondary text-light" onClick={() => handleStatusChange("Unknown", device.id)}>Unknown</Dropdown.Item>
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
    )
}