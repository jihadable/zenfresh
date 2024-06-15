import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentStatus(){
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/history")
    }, [navigate])
    
    return null
}