import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import OurPricing from "../components/OurPricing";

export default function Pricing(){
    return (
        <>
        <Navbar />
        <Hero page={"pricing"} header={"Pricing"} headerColor={"text-darkBlue"} />
        <OurPricing />
        <Footer />
        </>
    )
}