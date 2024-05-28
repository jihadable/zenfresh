import { useContext } from "react"
import Appointments from "../components/Appointments"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import OrderTimeline from "../components/OrderTimeline"
import { AuthContext } from "../contexts/AuthContext"
import NotFound from "./NotFound"

export default function Order(){

    document.title = "ZenFresh | Order"

    const { isAdmin } = useContext(AuthContext)

    if (isAdmin){
        return <NotFound />
    }

    return (
        <>
        <Navbar />
        <Hero page={"Order"} path={"/order"} />
        <OrderTimeline />
        <Appointments />
        <Footer />
        </>
    )
}