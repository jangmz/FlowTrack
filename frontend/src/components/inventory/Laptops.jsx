import DeviceTable from "./DeviceTable";

const laptops = [
    {
        id: 1,
        inventoryNumber: 8000,
        model: "ThinkPad T15",
        status: "available",
        user: {
            fullName: "John Doe",
        },        
        notes: "",
    },
    {
        id: 2,
        inventoryNumber: 8001,
        model: "ThinkPad T15",
        status: "available",
        user: {
            fullName: "John Doe",
        },
        notes: "",
    },
    {
        id: 3,
        inventoryNumber: 8002,
        model: "ThinkPad T15",
        status: "available",
        user: {
            fullName: "John Doe",
        },  
        notes: "",
    },
    {
        id: 4,
        inventoryNumber: 8003,
        model: "ThinkPad T15",
        status: "available",
        user: {
            fullName: "John Doe",
        },  
        notes: "",
    },
    {
        id: 5,
        inventoryNumber: 8004,
        model: "ThinkPad T15",
        status: "rented",
        user: {
            fullName: "Sarah Doe",
        },  
        notes: "",
    },
]

export default function Laptops() {

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h1>Laptops</h1>
            <DeviceTable devices={laptops} />
        </div>
    )
}