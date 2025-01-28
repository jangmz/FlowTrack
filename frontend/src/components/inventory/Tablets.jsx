import DeviceTable from "./DeviceTable";

const tablets = [
    {
        id: 1,
        inventoryNumber: 4000,
        model: "Lenovo P10",
        status: "available",
        user: {
            fullName: "John Doe",
        },        
        notes: "",
    },
    {
        id: 2,
        inventoryNumber: 4001,
        model: "Lenovo P10",
        status: "available",
        user: {
            fullName: "John Doe",
        },
        notes: "",
    },
    {
        id: 3,
        inventoryNumber: 4002,
        model: "Lenovo P10",
        status: "available",
        user: {
            fullName: "John Doe",
        },  
        notes: "",
    },
    {
        id: 4,
        inventoryNumber: 4003,
        model: "Lenovo P10",
        status: "unknown",
        user: {
            fullName: "John Doe",
        },  
        notes: "",
    },
    {
        id: 5,
        inventoryNumber: 4004,
        model: "Lenovo P10",
        status: "rented",
        user: {
            fullName: "Sarah Doe",
        },  
        notes: "",
    },
]

export default function Tablets() {

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h1>Tablets</h1>
            <DeviceTable devices={tablets} />
        </div>
    )
}