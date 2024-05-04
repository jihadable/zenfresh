import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import OrderHistory from "../components/OrderHistory";
import { AuthContext } from "../contexts/AuthContext";

export default function History(){

    const { login } = useContext(AuthContext)

    if (login === false){
        return <Navigate replace to={"/"} />
    }

    return (
        <>
        <Navbar />
        <Hero page={"History"} path={"/history"} />
        <OrderHistory />
        <Footer />
        </>
    )
}