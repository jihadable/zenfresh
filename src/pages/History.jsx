import { IconCheck, IconCurrencyDollar, IconX } from "@tabler/icons-react"
import { useContext, useEffect, useState } from "react"
import mandiri from "../assets/mandiri.png"
import ovo from "../assets/ovo.png"
import qris from "../assets/qris.png"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import NotFound from "../components/NotFound"
import { AuthContext } from "../contexts/AuthContext"

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
            <Hero page={"History"} path={"/history"} />
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
            setFilteredLaundries(laundries.filter(laundry => laundry.is_finish === false))
        }
        else if (selectedFilter === "Selesai"){
            setFilteredLaundries(laundries.filter(laundry => laundry.is_finish === true))
        }
    }, [laundries, selectedFilter])

    return (
        <section className="order-history-container w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">History Pemesanan</div>
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
            title: "Bank Mandiri", 
            img: mandiri
        },
        {
            title: "OVO", 
            img: ovo
        }
    ]

    const paymentMethodsImg = paymentMethodsData.filter(paymentMethod => laundry.payment_method === paymentMethod.title).map(paymentMethod => paymentMethod.img)[0]

    const getIDCurrency = total => "Rp " + total.toLocaleString('id-ID')

    return (
        <div className="history-item bg-white flex flex-col gap-8 rounded-md border-b-2 border-b-boldPurple overflow-hidden shadow-2xl">
            <div className="top flex items-center justify-between p-2">
                <div className="laundry-category font-bold">
                    {laundry.category.name} 
                    <span className="font-normal text-sm"> ({getIDCurrency(laundry.category.price)}/kg)</span>
                </div>
                <div className={`laundry-status text-sm px-1 rounded-md ${laundry.is_finish ? "bg-green-500" : "bg-yellow-400"}`}>{laundry.is_finish ? "Pesanan telah selesai" : "Pesanan sedang dikerjakan"}</div>
            </div>
            <div className="bottom flex items-end justify-between p-2 text-sm mobile:flex-col-reverse mobile:gap-8">
                <div className="date mobile:self-start">
                    {laundry.start_date} → {laundry.is_finish ? laundry.end_date : "-"}
                </div>
                <div className="payment flex flex-col items-end">
                    <div className="payment-method flex items-center gap-1">
                        <span>Metode pembayaran: </span>
                        {paymentMethodsImg != "Cash" && <img src={paymentMethodsImg} alt="Payment method" className="h-4" loading="lazy" />}
                        {paymentMethodsImg == "Cash" && <span className="flex items-center"><IconCurrencyDollar stroke={1.5} />{paymentMethodsImg}</span>}
                    </div>
                    <div className="total text-base font-bold">Total pembayaran: {laundry.weight ? getIDCurrency(laundry.category.price * laundry.weight) : "-"}</div>
                    <div className="paid flex items-center gap-1">
                    {
                        laundry.is_paid ? 
                        <>
                        <div className="rounded-md bg-green-600 text-white">
                            <IconCheck stroke={1.5} width={20} height={20} />
                        </div>
                        <span className="text-sm">Sudah bayar</span>
                        </> :
                        <>
                        <div className="rounded-md bg-red-600 text-white">
                            <IconX stroke={1.5} width={20} height={20} />
                        </div>
                        <span className="text-sm">Belum bayar</span>
                        </>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}