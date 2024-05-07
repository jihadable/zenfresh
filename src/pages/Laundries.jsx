import { IconCurrencyDollar, IconEdit, IconReload, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import mandiri from "../assets/mandiri.png";
import ovo from "../assets/ovo.png";
import qris from "../assets/qris.png";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

export default function Laundries(){

    const { login, isAdmin } = useContext(AuthContext)

    if (login === false || isAdmin === false){
        return <Navigate replace to={"/"} />
    }

    return (
        <>
        <Navbar />
        <Hero page={"Laundry"} path={"/laundries"} />
        <LaundryContainer />
        <Footer />
        </>
    )
}

function LaundryContainer(){

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
        <section className="laundries w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Daftar Laundry</div>
            <div className="laundries-content w-full flex flex-col items-center gap-2">
            {
                laundries === null &&
                <IconReload stroke={1.5} className="text-boldPurple w-10 h-10 animate-spin" />
            }
            {
                filteredLaundries !== null && filteredLaundries.length === 0 &&
                <span className="text-center text-xl font-bold">Daftar Laundry Kosong</span>
            }
            {
                filteredLaundries !== null && filteredLaundries.length > 0 &&
                <>
                <div className="laundry-filter w-full flex">
                    <div className="laundry-filter w-full flex items-center mobile:gap-4 mobile:overflow-x-auto">
                {
                    filterLabels.map((label, index) => (
                        <button type="button" className={`w-full py-2 border-b-2 whitespace-nowrap ${selectedFilter === label ? "border-b-boldPurple" : "border-b"}`} key={index} onClick={() => setSelectedFilter(label)}>{label}</button>
                    ))
                }
                    </div>
                </div>
                <div className="laundry-items w-full flex flex-col gap-2">
                {
                    filteredLaundries.map((laundry, index) => (
                        <LaundryItem key={index} laundry={laundry} />
                    ))
                }
                </div>
                </>
            }
            </div>
        </section>
    )
}

function LaundryItem({ laundry }){
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

    return (
        <div className="laundry-item bg-white flex flex-col gap-8 rounded-md border-b-2 border-b-boldPurple overflow-hidden">
            <div className="top flex items-center justify-between p-2">
                <div className="laundry-category font-bold">{laundry.category}</div>
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
                    <div className="total text-base">Total pembayaran: {laundry.is_finish ? laundry.total : "-"}</div>
                </div>
            </div>
            <div className="actions flex items-center gap-2 self-end p-2">
                <div className="edit flex items-center gap-1 p-1 rounded-md bg-cyan-500">
                    <IconEdit stroke={1.5} width={20} height={20} />
                    <span className="text-sm">Edit</span>
                </div>
                <button type="button" className="delete flex items-center gap-1 p-1 rounded-md bg-red-600 text-white">
                    <IconTrash stroke={1.5} width={20} height={20} />
                    <span className="text-sm">Hapus</span>
                </button>
            </div>
        </div>
    )
}