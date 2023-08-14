import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function About(){

    document.title = "ZenFresh | About"

    return (
        <>
        <Navbar />
        <Hero page={"about"} header={"About Us"} headerColor={"text-redCustome"} />
        <AboutUs />
        <Footer />
        </>
    )
}