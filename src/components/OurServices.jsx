import dryCleaning from "../assets/dry-cleaning.jpg"
import ironing from "../assets/ironing.jpg"
import stainRemoval from "../assets/stain-removal.jpg"
import bedCleaning from "../assets/bed-cleaning.jpg"
import tailor from "../assets/tailor.jpg"
import garmentCare from "../assets/garment-care.jpg"
import pickup from "../assets/pickup.jpg"
import ecoFriendly from "../assets/eco-friendly.jpg"
import onlineBooking from "../assets/online-booking.jpg"

export default function OurServices(){

    const services = [
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
        <section className="services flex flex-col gap-8 my-16 items-center mobile:px-4">
            <div className="header text-3xl">Our Services</div>
            <div className="text w-1/2 text-center mobile:w-full">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure officiis ab sapiente repudiandae ea molestias voluptatum illo aspernatur esse quo.</div>
            <div className="content w-full grid justify-items-center grid-cols-3 gap-y-12 mobile:flex mobile:flex-col mobile:gap-6 tablet:flex tablet:flex-wrap tablet:justify-center tablet:gap-4">
            {
                services.map((service, index) => {
                    return (
                        <div className="card w-72 shadow-xl mobile:w-full tablet:w-[30%]" key={index}>
                            <figure><img src={service.img} alt="Image" /></figure>
                            <div className="card-body p-6">
                                <h2 className="card-title justify-center text-center">{service.title}</h2>
                                <p className="text-center">{service.text}</p>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}