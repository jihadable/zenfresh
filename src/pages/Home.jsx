import Faqs from "../components/Faqs";
import Footer from "../components/Footer";
import HomeHero from "../components/HomeHero";
import Navbar from "../components/Navbar";
import OurServices from "../components/OurServices";
import PaymentMethods from "../components/PaymentMethods";
import Plans from "../components/Plans";
import Reviews from "../components/Reviews";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home(){

    return (
        <>
        <Navbar />
        <HomeHero />
        <Plans />
        <OurServices />
        <WhyChooseUs />
        <Reviews />
        <Faqs />
        <PaymentMethods />
        <Footer />
        </>
    )
}