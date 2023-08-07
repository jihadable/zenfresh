import Experience from "../components/Experience";
import Footer from "../components/Footer";
import HappyClients from "../components/HappyClients";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";

export default function Home(){

    return (
        <>
        <Navbar />
        <Hero page={"home"} header={"Unwind in Pristine Comfort"} headerColor={"text-greenCustome"} />
        <HowItWorks />
        <Experience />
        <HappyClients />
        <Footer />
        </>
    )
}