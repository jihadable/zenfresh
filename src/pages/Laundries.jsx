import { IconCheck, IconCurrencyDollar, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import mandiri from "../assets/mandiri.png";
import ovo from "../assets/ovo.png";
import qris from "../assets/qris.png";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

export default function Laundries(){

    document.title = "ZenFresh | Daftar Laundry"

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
                <span className="loading loading-spinner loading-lg bg-boldPurple"></span>
            }
            {
                filteredLaundries !== null &&
                <>
                <div className="laundry-filter w-full flex">
                    <div className="laundry-filter w-full flex items-center mobile:gap-8 mobile:overflow-x-auto">
                {
                    filterLabels.map((label, index) => (
                        <button type="button" className={`w-full py-2 border-b-2 whitespace-nowrap ${selectedFilter === label ? "border-b-boldPurple" : "border-b"}`} key={index} onClick={() => setSelectedFilter(label)}>{label}</button>
                    ))
                }
                    </div>
                </div>
                <div className="laundry-items w-full flex flex-col gap-2">
                {
                    filteredLaundries.length === 0 &&
                    <span className="mt-4 text-center text-xl font-bold">Daftar laundry kosong</span>
                }
                {
                    filteredLaundries.length > 0 &&
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

    const [isLoading, setIsLoading] = useState(false)

    const getTotalPayment = total => "Rp " + total.toLocaleString('id-ID')

    const { user } = laundry

    const { auth, token } = useContext(AuthContext)

    const handleDeleteLaundry = async() => {
        if (confirm("Apakah Anda yakin akan menghapus item ini?")){
            try {
                setIsLoading(true)

                const laundriesAPIEndpoint = import.meta.env.VITE_LAUNDRIES_API_ENDPOINT
    
                await axios.delete(`${laundriesAPIEndpoint}/${laundry.id}`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
    
                auth()

                toast.success("Berhasil menghapus data laundry")

                setIsLoading(false)
            } catch(error){
                const response = error.response.data
                
                if (response.status === 404){
                    toast.error("Laundry tidak ditemukan")
                }

                setIsLoading(false)
            }
        }
    }

    return (
        <div className="laundry-item bg-white flex flex-col rounded-md border-b-2 border-b-boldPurple overflow-hidden shadow-2xl">
            <div className="content flex p-2 mobile:flex-col mobile:gap-4">
                <div className="laundry-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">ID</div>
                        <div className="value">{laundry.id}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status</div>
                        <div className={`value w-fit px-1 rounded-md ${laundry.is_finish ? "bg-green-500" : "bg-yellow-400"}`}>{laundry.is_finish ? "Pesanan telah selesai" : "Pesanan sedang dikerjakan"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Kategori</div>
                        <div className="value">{laundry.category}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Tanggal mulai</div>
                        <div className="value">{laundry.start_date}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Tanggal selesai</div>
                        <div className="value">{laundry.end_date || "-"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Opsi pemesanan</div>
                        <div className="value flex items-center gap-2">
                            <span>{laundry.is_self_drop ? "Bawa sendiri" : "Pengambilan oleh kurir"}</span>
                            <span>-</span>
                            <span>{laundry.is_self_pickup ? "Ambil sendiri" : "Pengantaran oleh kurir"}</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Metode pembayaran</div>
                        <div className="value">
                        {
                            paymentMethodsImg != "Cash" ? <img src={paymentMethodsImg} alt="Payment method" className="h-4" loading="lazy" /> : <span className="flex items-center"><IconCurrencyDollar stroke={1.5} />{paymentMethodsImg}</span>
                        }
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Total pembayaran</div>
                        <div className="value">{laundry.total ? getTotalPayment(laundry.total) : "Rp-"}</div>
                    </div>
                    <div className="info-item flex items-center gap-1">
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
                <div className="user-info w-full flex flex-col gap-4">
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
                        <div className="value">{user.no_hp || "-"}</div>
                    </div>
                </div>
            </div>
            <div className="actions flex items-center gap-2 p-2 self-end">
                <Link to={"/edit/" + laundry.id} type="button" className="edit flex items-center gap-1 p-1 text-sm rounded-md bg-cyan-500">
                    <IconEdit stroke={1.5} width={20} height={20} />
                    <span>Edit</span>
                </Link>
                <button type="button" className="delete flex items-center gap-1 p-1 text-sm rounded-md bg-red-600 text-white" onClick={handleDeleteLaundry}>
                    <IconTrash stroke={1.5} width={20} height={20} />
                {
                    isLoading ?
                    <span className="loading loading-spinner loading-xs"></span> :
                    <span>Hapus</span>
                }
                </button>
            </div>
        </div>
    )
}