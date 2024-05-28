import { IconBottle } from "@tabler/icons-react"
import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import NotFound from "./NotFound"

export default function History(){

    document.title = "ZenFresh | History"

    const { login, isAdmin } = useContext(AuthContext)

    if (login === false || isAdmin){
        return <NotFound />
    }
    
    if (login === true && isAdmin === false){
        return (
            <>
            <Navbar />
            <Hero page={"Pesanan Saya"} path={"/history"} />
            <OrderHistory />
            <Footer />
            </>
        )
    }
}

function OrderHistory(){

    const filterLabels = ["Semua", "Belum Bayar", "Sedang Dikerjakan", "Selesai"]

    const [selectedFilter, setSelectedFilter] = useState("Semua")

    const { laundries } = useContext(AuthContext)

    const [filteredLaundries, setFilteredLaundries] = useState(laundries)

    useEffect(() => {
        if (selectedFilter === "Semua"){
            setFilteredLaundries(laundries)
        }
        else if (selectedFilter === "Belum Bayar"){
            setFilteredLaundries(laundries.filter(laundry => laundry.is_paid === false))
        }
        else if (selectedFilter === "Sedang Dikerjakan"){
            setFilteredLaundries(laundries.filter(laundry => laundry.status === "Menunggu proses pencucian"))
        }
        else if (selectedFilter === "Selesai"){
            setFilteredLaundries(laundries.filter(laundry => laundry.status === "Selesai"))
        }
    }, [laundries, selectedFilter])

    return (
        <section className="order-history-container w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Pesanan Saya</div>
            <div className="order-history-content w-full flex flex-col items-center gap-2">
            {
                laundries === null &&
                <span className="loading loading-spinner loading-lg bg-boldPurple"></span>
            }
            {
                filteredLaundries !== null &&
                <>
                <div className="history-filter w-full flex">
                    <div className="history-filter w-full flex items-center mobile:gap-4 mobile:overflow-x-auto">
                {
                    filterLabels.map((label, index) => (
                        <button type="button" className={`w-full py-2 border-b-2 whitespace-nowrap ${selectedFilter === label ? "border-b-boldPurple" : "border-b"}`} key={index} onClick={() => setSelectedFilter(label)}>{label}</button>
                    ))
                }
                    </div>
                </div>
                <div className="history-items w-full flex flex-col gap-2">
                {
                    filteredLaundries.length === 0 &&
                    <span className="mt-4 text-center text-xl font-bold">Tidak ada history pemesanan</span>

                }
                {
                    filteredLaundries.length > 0 &&
                    filteredLaundries.map((laundry, index) => (
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

    const getIDCurrency = total => "Rp " + total.toLocaleString('id-ID')

    return (
        <div className="history-item bg-white flex flex-col rounded-md border-b-2 border-b-boldPurple overflow-hidden shadow-2xl text-sm mobile:text-xs">
            <div className="top flex justify-between p-2 border-b">
                <div className="">ID: <span className="font-bold">{laundry.id}</span></div>
                <div className={`font-bold px-2 py-1 rounded-md text-xs h-fit ${laundry.is_paid ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>{laundry.is_paid ? "Sudah bayar" : "Belum bayar"}</div>
            </div>
            <div className="mid flex flex-col gap-2 p-2 my-4">
                <div className="category font-bold text-base flex items-center mobile:text-sm">
                    <IconBottle stroke={1.5} className="text-boldPurple" />
                    <span>Laundry {laundry.category.name} <span className="font-normal text-xs">({getIDCurrency(laundry.category.price)})</span></span>
                </div>
                {/* menunggu konfirmasi */}
                {/* kurir menjemput pakaian pelanggan */}
                {/* menunggu proses pencucian */}
                {/* kurir mengantar pakaian pelanggan */}
                {/* menunggu pembayaran */}
                {/* selesai */}
                <div className="">Status: {laundry.status}</div>
                <div className="wight">Berat total (kg): {laundry.weight || "--"}</div>
            </div>
            <div className="bottom flex items-end justify-between p-2 text-sm border-t">
                <div className="date text-xs">{laundry.start_date}</div>
                <div className="flex flex-col items-end">
                    <span className="mobile:text-xs">Total pembayaran</span>
                    <span className="text-boldPurple font-bold text-base mobile:text-sm">{laundry.weight ? getIDCurrency(laundry.weight * laundry.category.price) : "Rp --"}</span>
                </div>
            </div>
        </div>
    )
}