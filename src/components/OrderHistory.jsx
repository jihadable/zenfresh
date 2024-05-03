import { IconCurrencyDollar } from "@tabler/icons-react"
import { useState } from "react"
import mandiri from "../assets/mandiri.png"
import ovo from "../assets/ovo.png"
import qris from "../assets/qris.png"

export default function OrderHistory(){

    const filterLabels = ["Semua", "Belum Bayar", "Sedang Dikerjakan", "Selesai"]

    const [selectedFilter, setSelectedFilter] = useState("Semua")

    const laundries = [
        {
            category: "Biasa",
            payment_method: "Cash",
            start_date: "Selasa, 30 April 2024",
            end_date: "Kamis, 2 Mei 2024",
            is_paid: true,
            is_finish: true,
            total: "Rp.20.000"
        },
        {
            category: "Premium",
            payment_method: "OVO",
            start_date: "Jumat, 3 Mei 2024",
            end_date: null,
            is_paid: false,
            is_finish: false,
            total: null,
        }
    ]

    return (
        <section className="order-history-container w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">History Pemesanan</div>
            <div className="order-history-content w-full flex flex-col gap-2">
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