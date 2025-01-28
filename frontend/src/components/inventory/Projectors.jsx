import DeviceTable from "./DeviceTable";

const projectors = [
    {
        id: 1,
        inventoryNumber: 7000,
        model: "Sony LT-550",
        status: "available",
        user: {
            fullName: "John Doe",
        },        
        notes: "",
    },
    {
        id: 2,
        inventoryNumber: 7001,
        model: "Sony LT-550",
        status: "available",
        user: {
            fullName: "John Doe",
        },
        notes: "",
    },
    {
        id: 3,
        inventoryNumber: 7002,
        model: "Sony LT-550",
        status: "available",
        user: {
            fullName: "John Doe",
        },  
        notes: "",
    },
    {
        id: 4,
        inventoryNumber: 7003,
        model: "Sony LT-550",
        status: "unknown",
        user: {
            fullName: "John Doe",
        },  
        notes: "",
    },
    {
        id: 5,
        inventoryNumber: 7004,
        model: "Sony LT-550",
        status: "rented",
        user: {
            fullName: "Sarah Doe",
        },  
        notes: "",
    },
]

export default function Projectors() {

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h1>Projectors</h1>
            <DeviceTable devices={projectors} />
        </div>
    )
}