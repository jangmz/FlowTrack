import { formatTimeStamp } from "../../utility/dataFormatter.js";

export default function HistoryTableLog({ historyLog }) {
    return (
        <div className="container-fluid">
            <h1 className="text-center">History Log</h1>
            <table className="table">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Timestamp</th>
                        <th scope="col">Device</th>
                        <th scope="col">Client</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        historyLog.map((entry) => (
                            <tr key={entry.id}>
                                <td>{formatTimeStamp(entry.rentDate)}</td>
                                <td>{entry.device.inventoryNumber} ({entry.device.deviceType})</td>
                                <td>{entry.client ? entry.client.fullName : "returned"}</td>
                                <td>{entry.device.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}