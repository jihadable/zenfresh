import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import dryCleaning from "../assets/dry-cleaning.jpg"
import ironing from "../assets/ironing.jpg"
import stainRemoval from "../assets/stain-removal.jpg"
import bedCleaning from "../assets/bed-cleaning.jpg"
import tailor from "../assets/tailor.jpg"
import garmentCare from "../assets/garment-care.jpg"
import pickup from "../assets/pickup.jpg"
import ecoFriendly from "../assets/eco-friendly.jpg"
import onlineBooking from "../assets/online-booking.jpg"

export default function Services(){

    document.title = "ZenFresh | Services"

    return (
        <>
        <Navbar />
        <Hero page={"Services"} path={"/services"} />
        <OurServices />
        <Footer />
        </>
    )
}

function OurServices(){

    const servicesData = [
        {
            title: "Dry Cleaning",
            text: "ZenFresh offers dry cleaning services for delicate and special fabrics that require gentle cleaning methods to maintain their quality.",
            img: dryCleaning
        },
        {
            title: "Pressing and Ironing",
            text: "ZenFresh provides pressing and ironing services to give your clothes a crisp and polished look, ensuring they are wrinkle-free and ready to wear.",
            img: ironing
        },
        {
            title: "Stain Removal",
            text: "ZenFresh may have expertise in stain removal, ensuring that even stubborn stains are treated effectively, increasing the chances of successful removal.",
            img: stainRemoval
        },
        {
            title: "Bedding and Linen Cleaning",
            text: "ZenFresh takes care of cleaning and refreshing bedding, linens, and other household textiles to ensure a clean and comfortable living space.",
            img: bedCleaning
        },
        {
            title: "Tailoring and Repairs",
            text: "In addition to cleaning, ZenFresh may offer minor tailoring and repair services to mend small tears, replace buttons, and ensure your clothes are in good condition.",
            img: tailor
        },
        {
            title: "Special Garment Care",
            text: "For items like suits, wedding dresses, and delicate garments, ZenFresh may offer specialized care to preserve their quality and extend their lifespan.",
            img: garmentCare
        },
        {
            title: "Pickup and Delivery",
            text: "ZenFresh may provide a convenient pickup and delivery service, allowing customers to schedule laundry services without leaving their homes.",
            img: pickup
        },
        {
            title: "Eco-Friendly Options",
            text: "Some laundry businesses, including ZenFresh, might offer eco-friendly or sustainable cleaning options using environmentally friendly detergents and practices.",
            img: ecoFriendly
        },
        {
            title: "Online Booking and Tracking",
            text: "ZenFresh might have an online platform where customers can book services, track the status of their laundry, and manage their orders.",
            img: onlineBooking
        }
    ]

    return (
        <section className="our-services w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title font-bold text-3xl">Our Services</div>
            <div className="services-items grid grid-cols-3 gap-4 mobile:flex mobile:flex-col">
            {
                servicesData.map((item, index) => {
                    return (
                        <div className="card w-full shadow-xl bg-white" key={index}>
                            <figure>
                                <img src={item.img} alt="Image" className="w-full h-fit" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}