import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function DeviceTable({ devices }) {
    const statusVariant = {
        available: "success",
        unavailable: "danger",
        rented: "warning",
        reserved: "primary",
        damaged: "dark",
        unknown: "secondary",
    };

    // TODO: remove device from DB & context
    function deleteDevice(deviceId) {
        console.log("Device removed: ", deviceId);
    }

    // TODO: change status in DB & context
    function handleStatusChange(status, deviceId) {
        console.log("Status: ", status);
        console.log("Device: ", deviceId);
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
                                {/*<select name="status" id="status" value={device.status} className="form-control w-50" onChange={(e) => handleStatusChange(e)} >
                                    <option value="available">available</option>
                                    <option value="unavailable">unavailable</option>
                                    <option value="rented">rented</option>
                                    <option value="reserved">reserved</option>
                                    <option value="damaged">damaged</option>
                                    <option value="unknown">unknown</option>
                                </select>*/}
                                <Dropdown>
                                    <Dropdown.Toggle variant={statusVariant[device.status]} className="w-50">
                                        {device.status}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="text-success" onClick={() => handleStatusChange("available", device.id)}>Available</Dropdown.Item>
                                        <Dropdown.Item className="text-danger" onClick={() => handleStatusChange("unavailable", device.id)}>Unavailable</Dropdown.Item>
                                        <Dropdown.Item className="text-warning" onClick={() => handleStatusChange("rented", device.id)}>Rented</Dropdown.Item>
                                        <Dropdown.Item className="text-primary" onClick={() => handleStatusChange("reserved", device.id)}>Reserved</Dropdown.Item>
                                        <Dropdown.Item className="text-danger" onClick={() => handleStatusChange("damaged", device.id)}>Damaged</Dropdown.Item>
                                        <Dropdown.Item className="text-muted" onClick={() => handleStatusChange("unknown", device.id)}>Unknown</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                            <td className="text-start">{device.user.fullName}</td>
                            <td>
                                <div className="d-flex gap-2 align-items-center justify-content-end">
                                    <Link to={`/devices/laptops/${device.id}`}>
                                        <button className="btn btn-outline-primary d-flex align-items-center justify-cotnent-center"><FaRegEdit /></button>
                                    </Link>
                                    <button onClick={(e) => deleteDevice(device.id)} className="btn btn-outline-danger d-flex align-items-center justify-cotnent-center"><FaTrashAlt /></button>
                                    
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}