import { useState } from "react"

export default function OrderHistory(){

    const filterLabels = ["Semua", "Belum Bayar", "Sedang Dikerjakan", "Dikirim", "Selesai"]

    const [selectedFilter, setSelectedFilter] = useState("Semua")

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
                <div className="history-items bg-white flex flex-col">
                    history
                </div>
            </div>
        </section>
    )
}