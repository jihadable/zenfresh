import Experience from "../components/Experience";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HappyClients from "../components/HappyClients";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import Payment from "../components/Payment";

export default function Home(){

    return (
        <>
        <Navbar />
        <Hero page={"home"} header={"Unwind in Pristine Comfort"} />
        <Features />
        <HowItWorks />
        <Experience />
        <HappyClients />
        <Payment />
        <Footer />
        </>
    )
}