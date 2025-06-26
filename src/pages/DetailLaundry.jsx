import { IconStarFilled } from "@tabler/icons-react"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import { LaundryContext } from "../contexts/LaundryContext"
import { getIdCurrency } from "../utils/getIdCurrency"
import { getIdDate } from "../utils/getIdDate"
import NotFound from "./NotFound"

export default function DetailLaundry(){
    const { id } = useParams()
    const { login, isAdmin } = useContext(AuthContext)
    const { laundries } = useContext(LaundryContext)
    
    const [laundry, setLaundry] = useState(null)
    
    useEffect(() => {
        if (laundries !== null){
            setLaundry(laundries.filter(laundry => laundry.id === id)[0])
        }
    }, [id, laundries])
    
    if (login === false || isAdmin === false || (laundry === undefined && laundries !== null)){
        return <NotFound />
    }

    if (login === true && isAdmin && laundries !== null && laundry !== undefined){
        document.title = "ZenFresh | Order Detail"

        return (
            <>
            <Navbar />
            <Hero page={"Detail Pesanan"} path={"/edit/" + id} />
            <DetailLaundryContainer laundry={laundry} />
            <Footer />
            </>
        )
    }
}

function DetailLaundryContainer({ laundry }){
    return (
        <section className="edit-laundry-container w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Detail Pesanan</div>
            {
                laundry === null &&
                <span className="loading loading-spinner loading-lg bg-boldPurple"></span>
            }
            {
                laundry !== null &&
                <DetailLaundryContent user={laundry.user} laundry={laundry} />
            }
        </section>
    )
}

function DetailLaundryContent({ user, laundry }){
    const getArrayOfStarsFromRating = rate => {
        const arr = []

        for (let i = 1; i <= rate; i++){
            arr.push(true)
        }

        for (let i = rate + 1; i <= 5; i++){
            arr.push(false)
        }

        return arr
    }

    return (
        <div className="edit-laundry-content w-full flex flex-col rounded-md border-b-2 border-b-boldPurple overflow-hidden shadow-2xl bg-white">
            <div className="edit-laundry-content w-full flex gap-2 p-2 mobile:flex-col mobile:gap-4">
                <div className="laundry-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">ID</div>
                        <div className="value font-bold">{laundry.id}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status</div>
                        <div className={`value font-bold px-2 py-1 rounded-md text-xs w-fit h-fit ${laundry.is_paid ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>{laundry.is_paid ? "Sudah bayar" : "Belum bayar"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Kategori</div>
                        <div className="value">{laundry.category.name}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Berat total(kg)</div>
                        <div className="value">{laundry.weight}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Tanggal</div>
                        <div className="value">{getIdDate(laundry.date)}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Metode pembayaran</div>
                        <div className="field">{laundry.payment_method || "--"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Total pembayaran</div>
                        <div className="value font-bold text-boldPurple">{laundry.weight !== null ? getIdCurrency(laundry.weight * laundry.category.price) : "Rp --"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status pembayaran</div>
                        <div className={`font-bold px-2 py-1 rounded-md text-xs w-fit h-fit ${laundry.is_paid ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>{laundry.is_paid ? "Sudah bayar" : "Belum bayar"}</div>
                    </div>
                </div>
                <div className="user-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">Rate dari pelanggan</div>
                        <div className="value flex items-center">
                        {
                            laundry.rate ?
                            getArrayOfStarsFromRating(laundry.rate).map((item, index) => (
                                <IconStarFilled className={`${item ? "text-boldPurple" : "text-neutral"}`} width={12} height={12} key={index} />
                            )) : 
                            "Tidak ada"
                        }
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Nama lengkap Pelanggan</div>
                        <div className="value">{user.fullname}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Alamat</div>
                        <div className="value">{user.address || "-"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">No HP</div>
                        <div className="value">{user.phone || "-"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}