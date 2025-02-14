import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { FaCheck } from "react-icons/fa";
import { useClientContext } from "../../context/ClientsContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NewClientForm() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { loading, error, createClient } = useClientContext();
    const [errorLocal, setErrorLocal] = useState(error);
    const [message, setMessage] = useState(null);
    const [client, setClient] = useState({
        fullName: "",
        email: "",
    });

    useEffect(() => {
        if (!user) navigate("/log-in");
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setClient((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage(null);
        setErrorLocal(null);
        
        try {
            await createClient(client);
            setMessage("Client created successfully.");
            setClient({ fullName: "", email:"" });
        } catch (error) {
            console.error(error);
            setErrorLocal(error.message);
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>New client</h1>
            {
                errorLocal && 
                <p className="alert alert-danger">{errorLocal}</p>
            }
            {
                message &&
                <p className="alert alert-success">{message}</p>
            }
            {
                loading &&
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="spinner-border m-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {
                user &&
                <form onSubmit={ handleSubmit } className="d-flex flex-column w-50">
                    <FormInput
                        labelText={"Full Name"}
                        inputName={"fullName"}
                        inputType={"text"}
                        inputValue={client.fullName}
                        onChange={ handleChange }
                    />
                    <FormInput
                        labelText={"E-mail"}
                        inputName={"email"}
                        inputType={"email"}
                        inputValue={client.email}
                        onChange={ handleChange }
                    />
                    <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center">
                        <FaCheck className="me-1"/>
                        Create
                    </button>
                </form>
            }
        </div>
    )
}