import { useContext } from "react"
import { Navigate } from "react-router-dom"
import Appointments from "../components/Appointments"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"

export default function Order(){

    document.title = "ZenFresh | Order"

    const { isAdmin } = useContext(AuthContext)

    if (isAdmin){
        return <Navigate replace to={"/"} />
    }

    return (
        <>
        <Navbar />
        <Hero page={"Order"} path={"/order"} />
        <Appointments />
        <Footer />
        </>
    )
}