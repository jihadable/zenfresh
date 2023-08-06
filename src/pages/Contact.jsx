import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Contact(){
    return (
        <>
        <Navbar />
        <Hero page={"contact"} header={"Contact Us"} headerColor={"text-lightBlue"} />
        <Footer />
        </>
    )
}