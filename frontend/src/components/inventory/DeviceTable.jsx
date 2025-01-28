import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DeviceTable({ devices }) {
    // TODO: remove device from DB & context
    function deleteDevice(deviceId) {
        console.log("Device removed: ", deviceId);
    }

    // TODO: change status in DB & context
    function handleStatusChange(e) {
        console.log(e.target.value);
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
                                <select name="status" id="status" value={device.status} onChange={(e) => handleStatusChange(e)} >
                                    <option value="available">available</option>
                                    <option value="unavailable">unavailable</option>
                                    <option value="rented">rented</option>
                                    <option value="reserved">reserved</option>
                                    <option value="damaged">damaged</option>
                                    <option value="unknown">unknown</option>
                                </select>
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