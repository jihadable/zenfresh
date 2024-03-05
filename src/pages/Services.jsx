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
        },
        {
            title: "Pembersihan Sprei dan Bedcover",
            text: "ZenFresh menangani pembersihan dan penyegaran sprei, bedcover, dan tekstil rumah tangga lainnya untuk memastikan ruang hidup bersih dan nyaman.",
            img: bedCleaning
        },
        {
            title: "Menjahit dan memperbaiki",
            text: "Selain pembersihan, ZenFresh menawarkan layanan penjahitan dan perbaikan kecil untuk memperbaiki robekan kecil, mengganti kancing, dan memastikan pakaian Anda dalam kondisi baik.",
            img: tailor
        },
        {
            title: "Perawatan Pakaian Khusus",
            text: "Untuk barang-barang seperti jas, gaun pengantin, dan pakaian halus, ZenFresh menawarkan perawatan khusus untuk menjaga kualitas tetap terjaga",
            img: garmentCare
        },
        {
            title: "Penjemputan dan Pengiriman",
            text: "ZenFresh dapat menyediakan layanan penjemputan dan pengantaran yang nyaman, memungkinkan pelanggan menjadwalkan layanan laundry tanpa harus meninggalkan rumah.",
            img: pickup
        },
        {
            title: "Ramah Lingkungan",
            text: "Beberapa bisnis laundry, termasuk ZenFresh, menawarkan opsi pembersihan ramah lingkungan atau berkelanjutan dengan menggunakan deterjen dan praktik ramah lingkungan.",
            img: ecoFriendly
        },
        {
            title: "Pemesanan dan Pelacakan Online",
            text: "ZenFresh memiliki platform online di mana pelanggan dapat memesan layanan, melacak status cucian mereka, dan mengelola pesanan mereka.",
            img: onlineBooking
        }
    ]

    return (
        <section className="our-services w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title font-bold text-3xl">Services Kami</div>
            <div className="services-items grid grid-cols-3 gap-4 mobile:flex mobile:flex-col">
            {
                servicesData.map((item, index) => {
                    return (
                        <div className="card w-full shadow-xl bg-white overflow-hidden" key={index}>
                            <img src={item.img} alt="Image" className="w-full" />
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