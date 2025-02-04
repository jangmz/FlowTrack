import DeviceTable from "./DeviceTable";
import { useDeviceContext } from "../../context/DevicesContext";

export default function Laptops() {
    const { laptops, loading, error } = useDeviceContext();

    console.log("Laptops:",laptops);

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h1>Laptops</h1>
            {
                loading && 
                <p className="alert alert-info">
                    Please wait for the data to load...
                </p>
            }
            {
                error && 
                <p className="alert alert-danger">
                    {error}
                </p>
            }
            {<DeviceTable devices={laptops} />}
        </div>
    )
}