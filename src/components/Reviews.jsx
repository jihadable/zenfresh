import { IconMailForward, IconQuote } from "@tabler/icons-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

export default function Reviews(){

    const { login, isAdmin } = useContext(AuthContext)

    const reviewsData = [
        {
            fullname: "Dewi",
            address: "Condongcatur, Sleman",
            content: "Saya sudah menjadi pelanggan ZenFresh selama lebih dari setahun, dan saya tidak pernah kecewa. Layanan mereka sangat nyaman, terutama bagi seseorang dengan jadwal sibuk seperti saya. Pakaian saya selalu kembali dalam kondisi sempurna, dan aroma segarnya luar biasa."
        },
        {
            fullname: "Yanto",
            address: "Kota Gede, Yogyakarta",
            content: "Saya baru-baru ini mencoba ZenFresh setelah mendapat beberapa rekomendasi dari teman. Hasilnya luar biasa! Layanan penjemputan dan pengantaran sangat efisien, dan pakaian saya kembali lebih bersih dan segar dibandingkan saat saya mencucinya sendiri. Saya sangat senang telah menemukan ZenFresh."
        }
    ]

    return (
        <section className="reviews w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:flex-col mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title font-bold text-3xl text-center">Reviews</div>
            <div className="reviews-items flex gap-4 mobile:flex-col">
            {
                reviewsData.map((item, index) => (
                    <div className="item rounded-xl bg-white shadow-2xl p-4 flex flex-col gap-4" key={index}>
                        <div className="text text-black/[.7]">{item.content}</div>
                        <div className="info flex justify-between items-center">
                            <div className="img-name flex items-center gap-4">
                            <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${item.fullname}`}alt="Image" className="w-10 rounded-full h-fit" />
                                <div className="name-place flex flex-col">
                                    <div className="name font-bold">{item.fullname}</div>
                                    <div className="place text-black/[.7]">{item.address}</div>
                                </div>
                            </div>
                            <IconQuote width={36} height={36} className="text-boldPurple" />
                        </div>
                    </div>
                ))
            }
            </div>
        {
            login && isAdmin === false &&
            <Link to={"/review"} className="give-review bg-boldPurple py-2 px-3 rounded-md text-white flex items-center gap-2">
                <span>Berikan review Anda</span>
                <IconMailForward stroke={1.5} />
            </Link>
        }
        </section>
    )
}