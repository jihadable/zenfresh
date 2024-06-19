import { Link } from "react-router-dom"
import dryCleaning from "../assets/dry-cleaning.jpg"
import ironing from "../assets/ironing.jpg"
import stainRemoval from "../assets/stain-removal.jpg"
import goTop from "../utils/goTop"

export default function OurServices(){

    const servicesData = [
        {
            title: "Cuci Kering",
            text: "ZenFresh menawarkan layanan dry cleaning untuk kain halus dan khusus yang memerlukan metode pembersihan lembut untuk menjaga kualitasnya.",
            img: dryCleaning
        },
        {
            title: "Penyetrikaan Pakaian",
            text: "ZenFresh menyediakan layanan menyetrika untuk memberikan pakaian Anda tampilan yang rapi dan halus, memastikan pakaian bebas kusut dan siap dipakai.",
            img: ironing
        },
        {
            title: "Penghapusan Noda",
            text: "ZenFresh memiliki keahlian dalam menghilangkan noda, memastikan bahwa noda membandel sekalipun dapat ditangani secara efektif, sehingga meningkatkan peluang keberhasilan penghapusan.",
            img: stainRemoval
        }
    ]

    return (
        <section className="our-services w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Services Kami</div>
            <div className="services-items w-full flex gap-4 mobile:flex-col">
            {
                servicesData.map((item, index) => {
                    return (
                        <div className="card w-full shadow-xl bg-white overflow-hidden" key={index}>
                            <img src={item.img} alt="Image" className="w-full" />
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