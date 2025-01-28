import DeviceTable from "./DeviceTable";

const desktops = [
    {
        id: 1,
        inventoryNumber: 6000,
        model: "Lenovo ThinkCentre m710q",
        status: "available",
        user: {
            fullName: "John Doe",
        },        
        notes: "",
    },
    {
        id: 2,
        inventoryNumber: 6001,
        model: "Lenovo ThinkCentre m710q",
        status: "available",
        user: {
            fullName: "John Doe",
        },
        notes: "",
    },
    {
        id: 3,
        inventoryNumber: 6002,
        model: "Lenovo ThinkCentre m710q",
        status: "available",
        user: {
            fullName: "John Doe",
        },  
        notes: "",
    },
    {
        id: 4,
        inventoryNumber: 6003,
        model: "Lenovo ThinkCentre m710q",
        status: "unknown",
        user: {
            fullName: "John Doe",
        },  
        notes: "",
    },
    {
        id: 5,
        inventoryNumber: 6004,
        model: "Lenovo ThinkCentre m710q",
        status: "rented",
        user: {
            fullName: "Sarah Doe",
        },  
        notes: "",
    },
]

export default function Desktops() {

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h1>Desktops</h1>
            <DeviceTable devices={desktops} />
        </div>
    )
}