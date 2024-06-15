import { useNavigate } from "react-router-dom";

export default function PaymentStatus(){
    const navigate = useNavigate()

    navigate("/history")
}