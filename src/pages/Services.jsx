import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import OurServices from "../components/OurServices";

export default function Services(){
    return (
        <>
        <Navbar />
        <Hero page={"services"} header={"Our Services"} headerColor={"text-redCustome"} />
        <OurServices />
        <Footer />
        </>
    )
}