import { IconArrowRight, IconBottle, IconPencilCheck, IconStarFilled } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import NotFound from "./NotFound"

export default function History(){

    const { login, isAdmin } = useContext(AuthContext)

    useEffect(() => {
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
        const clientKey = import.meta.env.VITE_CLIENT_KEY

        const script = document.createElement("script")

        script.src = snapScript
        script.setAttribute("data-client-key", clientKey)
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    if (login === false || isAdmin){
        return <NotFound />
    }
    
    if (login === true && isAdmin === false){
        document.title = "ZenFresh | Pesanan Saya"
        
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

    const { token, auth } = useContext(AuthContext)
    
    const [isRateBtnLoading, setIsRateBtnLoading] = useState(false)
    const [isPayBtnLoading, setIsPayBtnLoading] = useState(false)

    const handleRate = async(rate) => {
        try {
            setIsRateBtnLoading(true)

            const laundriesAPIEndpoint = import.meta.env.VITE_LAUNDRIES_API_ENDPOINT

            await axios.patch(
                `${laundriesAPIEndpoint}/${laundry.id}`, 
                {
                    rate
                },
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            auth()

            toast.success("Berhasil memberikan rate laundry")

            setIsRateBtnLoading(false)
        } catch(error){
            console.log(error)
            setIsRateBtnLoading(false)
            toast.success("Gagal memberikan rate laundry")
        }
    }

    const handlePay = async(id, weight, price) => {
        try {
            const total = Math.round(weight * price)
            setIsPayBtnLoading(true)

            const paymentAPIEndpoint = import.meta.env.VITE_PAYMENT_API_ENDPOINT
            
            const { data } = await axios.post(`${paymentAPIEndpoint}/token`, {
                laundry_id: id,
                total
            })
            
            window.snap.pay(data.token)
            
            setIsPayBtnLoading(false)
        } catch(error){
            console.log(error)
            setIsPayBtnLoading(false)
            toast.error("Tidak bisa melakukan pembayaran")
        }
    }

    return (
        <div className="history-item bg-white flex flex-col rounded-md border-b-2 border-b-boldPurple shadow-2xl text-sm mobile:text-xs">
            <div className="top flex items-center justify-between p-2 border-b">
                <div className="">ID: <span className="font-bold">{laundry.id}</span></div>
                <div className={`font-bold px-2 py-1 rounded-md text-xs h-fit ${laundry.is_paid ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>{laundry.is_paid ? "Sudah bayar" : "Belum bayar"}</div>
            </div>
            <div className="mid flex flex-col gap-2 p-2 my-4">
                <div className="category font-bold text-base flex items-center mobile:text-sm">
                    <IconBottle stroke={1.5} className="text-boldPurple" />
                    <span>Laundry {laundry.category.name} <span className="font-normal text-xs">({getIDCurrency(laundry.category.price)}/kg)</span></span>
                </div>
                {/* menunggu konfirmasi */}
                {/* kurir menjemput pakaian pelanggan */}
                {/* menunggu proses pencucian */}
                {/* kurir mengantar pakaian pelanggan */}
                {/* menunggu pembayaran */}
                {/* selesai */}
                <div className="">
                    Status: 
                    <span className={`value font-bold px-2 py-1 rounded-md text-xs w-fit h-fit ${laundry.status === "Selesai" ? "text-green-600 bg-green-100" : `${laundry.status === "Menunggu pembayaran" ? "text-red-600 bg-red-100" : "text-yellow-600 bg-yellow-100"}`}`}>{laundry.status}</span>
                </div>
                <div className="weight">Berat total (kg): {laundry.weight || "--"}</div>
            {
                laundry.rate ?
                <div className="rate flex items-center gap-1">
                    Rate dari Anda:
                    <span>
                    {
                        laundry.rate ? 
                        <span className="flex items-center">
                            <IconStarFilled stroke={1.5} width={16} height={16} className="text-yellow-500" />
                            <span>{laundry.rate}/5</span>
                        </span> : 
                        "Tidak ada"
                    }
                    </span>
                </div> :
                isRateBtnLoading ?
                <div className="w-fit py-1 px-[19px] flex items-center justify-center bg-boldPurple rounded-md">
                    <span className="loading loading-spinner loading-sm bg-white mobile:loading-xs"></span>
                </div> :
                <div className="dropdown">
                    <button type="button" className="rate flex items-center gap-1 rounded-md bg-boldPurple text-white w-fit p-1">
                        <IconPencilCheck stroke={1.5} width={16} height={16} />
                        <span>Rate</span>
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] mt-1 bg-white rounded-md w-24 shadow-2xl overflow-hidden">
                    {
                        [1,2,3,4,5].map(item => (
                            <li className="flex items-center gap-1 p-2 cursor-pointer hover:bg-black/[.1]" key={item} onClick={() => handleRate(item)}>
                                <IconStarFilled stroke={1.5} width={16} height={16} className="text-yellow-500" />
                                <span>{item}</span>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            }
            {
                laundry.weight && !laundry.is_paid &&
                (
                    isPayBtnLoading ?
                    <div className="self-end py-1 px-[26.5px] flex items-center justify-center bg-boldPurple rounded-md mobile:px-[26.25px]">
                        <span className="loading loading-spinner loading-sm bg-white mobile:loading-xs"></span>
                    </div> :
                    <button type="button" className="pay-btn self-end flex items-center gap-1 rounded-md bg-boldPurple text-white p-1 px-2" onClick={() => handlePay(laundry.id, laundry.weight, laundry.category.price)}>
                        <span>Bayar</span>
                        <IconArrowRight stroke={1.5} width={16} height={16} />
                    </button>
                )
            }
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