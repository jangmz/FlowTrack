import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useHistoryContext } from "../context/HistoryContext";
import { useNavigate } from "react-router-dom";
import HistoryTableLog from "../components/general/HistoryTableLog";

export default function History() {
    const { user } = useAuth();
    const { historyLog } = useHistoryContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/log-in");
    }, []);

    return (
        <div className="container-fluid">
            {
                user && 
                <HistoryTableLog historyLog={historyLog} />
            }
        </div>
    )
}