import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

export default function Laundries(){

    const { login, isAdmin } = useContext(AuthContext)

    if (login === false || isAdmin === false){
        return <Navigate replace to={"/"} />
    }

    return (
        <>
        <Navbar />
        <Hero page={"Laundry"} path={"/laundries"} />
        <Footer />
        </>
    )
}