import { Link } from "react-router-dom"
import dryCleaning from "../assets/dry-cleaning.jpg"
import ironing from "../assets/ironing.jpg"
import stainRemoval from "../assets/stain-removal.jpg"
import goTop from "./goTop"

export default function OurServices(){

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
        }
    ]

    return (
        <section className="our-services w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Our Services</div>
            <div className="services-items w-full flex gap-4 mobile:flex-col">
            {
                servicesData.map((item, index) => {
                    return (
                        <div className="card w-full shadow-xl bg-white" key={index}>
                            <figure>
                                <img src={item.img} alt="Image" />    
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{item.text}</p>
                                <div className="card-actions justify-end">
                                    <Link to="/services" onClick={goTop} className="px-4 py-2 bg-boldPurple text-white rounded-md">Read more</Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}