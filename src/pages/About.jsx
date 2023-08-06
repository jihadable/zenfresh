import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function About(){
    return (
        <>
        <Navbar />
        <Hero page={"about"} header={"About Us"} headerColor={"text-redCustome"} />
        <Footer />
        </>
    )
}