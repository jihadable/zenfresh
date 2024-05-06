import { IconCurrencyDollar } from "@tabler/icons-react"
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import mandiri from "../assets/mandiri.png"
import ovo from "../assets/ovo.png"
import qris from "../assets/qris.png"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"

export default function History(){

    const { login, isAdmin } = useContext(AuthContext)

    if (login === false || isAdmin){
        return <Navigate replace to={"/"} />
    }

    return (
        <>
        <Navbar />
        <Hero page={"History"} path={"/history"} />
        <OrderHistory />
        <Footer />
        </>
    )
}

function OrderHistory(){

    const filterLabels = ["Semua", "Belum Bayar", "Sedang Dikerjakan", "Selesai"]

    const [selectedFilter, setSelectedFilter] = useState("Semua")

    const { laundries } = useContext(AuthContext)

    return (
        <section className="order-history-container w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">History Pemesanan</div>
            <div className="order-history-content w-full flex flex-col gap-2">
            {
                laundries.length === 0 &&
                <span className="text-center text-xl font-bold">Tidak ada history pemesanan</span>
            }
            {
                laundries.length > 0 &&
                <>
                <div className="history-filter w-full flex items-center">
                {
                    filterLabels.map((label, index) => (
                        <button type="button" className={`w-full py-2 border-b-2 ${selectedFilter === label ? "border-b-boldPurple" : "border-b"}`} key={index} onClick={() => setSelectedFilter(label)}>{label}</button>
                    ))
                }
                </div>
                <div className="history-items flex flex-col gap-2">
                {
                    laundries.map((laundry, index) => (
                        <HistoryItem key={index} laundry={laundry} />
                    ))
                }
                </div>
                </>
            }
            </div>
        </section>
    )
}

function HistoryItem({ laundry }){

    const paymentMethodsData = [
        {
            title: "Cash", 
            img: "Cash"
        },
        {
            title: "QRIS", 
            img: qris
        },
        {
            title: "Bank mandiri", 
            img: mandiri
        },
        {
            title: "OVO", 
            img: ovo
        }
    ]

    const paymentMethodsImg = paymentMethodsData.filter(paymentMethod => laundry.payment_method === paymentMethod.title).map(paymentMethod => paymentMethod.img)[0]

    return (
        <div className="history-item bg-white flex flex-col gap-8 rounded-md border-b-2 border-b-boldPurple overflow-hidden">
            <div className="top flex items-center justify-between p-2">
                <div className="laundry-category font-bold">{laundry.category}</div>
                <div className={`laundry-status text-sm px-1 rounded-md ${laundry.is_finish ? "bg-green-500" : "bg-yellow-400"}`}>{laundry.is_finish ? "Pesanan telah selesai" : "Pesanan sedang dikerjakan"}</div>
            </div>
            <div className="bottom flex items-end justify-between p-2 text-sm">
                <div className="date">
                    {laundry.start_date} → {laundry.is_finish ? laundry.end_date : "-"}
                </div>
                <div className="payment flex flex-col items-end">
                    <div className="payment-method flex items-center gap-1">
                        <span>Metode pembayaran: </span>
                        {paymentMethodsImg != "Cash" && <img src={paymentMethodsImg} alt="Payment method" className="h-4" loading="lazy" />}
                        {paymentMethodsImg == "Cash" && <span className="flex items-center"><IconCurrencyDollar stroke={1.5} />{paymentMethodsImg}</span>}
                    </div>
                    <div className="total text-base">Total pembayaran: {laundry.is_finish ? laundry.total : "-"}</div>
                </div>
            </div>
        </div>
    )
}