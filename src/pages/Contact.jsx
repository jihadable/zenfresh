import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Contact(){

    document.title = "ZenFresh | Contact"

    return (
        <>
        <Navbar />
        <Hero page={"contact"} header={"Contact Us"} />
        <ContactUs />
        <Footer />
        </>
    )
}