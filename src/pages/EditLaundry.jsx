import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

export default function EditLaundry(){

    const { id } = useParams()
    const { laundries } = useContext(AuthContext)

    const [laundry, setLaundry] = useState(null)

    useEffect(() => {
        if (laundries !== null){
            setLaundry(laundries.filter(laundry => laundry.id === id)[0])
        }
    }, [id, laundries])

    console.log(laundry)

    return (
        <>
        <Navbar />
        <Hero page={"Edit Laundry"} path={"/edit/" + id} />
        <Footer />
        </>
    )
}