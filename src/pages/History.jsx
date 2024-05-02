import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import OrderHistory from "../components/OrderHistory";

export default function History(){
    return (
        <>
        <Navbar />
        <Hero page={"History"} path={"/history"} />
        <OrderHistory />
        <Footer />
        </>
    )
}