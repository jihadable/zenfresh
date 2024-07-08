import { IconBottle, IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LaundryContext } from "../contexts/LaundryContext";
import { getIdCurrency } from "../utils/getIdCurrency";
import { getIdDate } from "../utils/getIdDate";
import NotFound from "./NotFound";

export default function Laundries(){

    const { login, isAdmin } = useContext(AuthContext)

    if (login === false || isAdmin === false){
        return <NotFound />
    }

    if (login === true && isAdmin){
        document.title = "ZenFresh | Daftar Pesanan"

        return (
            <>
            <Navbar />
            <Hero page={"Laundry"} path={"/laundries"} />
            <LaundryContainer />
            <Footer />
            </>
        )
    }
}

function LaundryContainer(){

    const { laundries } = useContext(LaundryContext)

    const filterLabels = ["Semua", "Belum Bayar", "Sedang Dikerjakan", "Selesai"]
    const [selectedFilter, setSelectedFilter] = useState("Semua")

    const [filteredLaundries, setFilteredLaundries] = useState(laundries)

    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = parseInt(searchParams.get("page") || 1)
    const laundriesPerPage = 5
    const [pages, setPages] = useState([])

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

    useEffect(() => {
        const len = filteredLaundries?.length
        let firstPage = 1
        let lastPage = Math.ceil(len / 5)
        
        if (len <= 10){
            setPages([1,2])
        }
        else if (len > 10){

            if (currentPage === firstPage){
                setPages([1,2,3])
            }
            else if (currentPage === lastPage){
                setPages([lastPage - 2, lastPage - 1, lastPage])
            }
            else {
                setPages([currentPage - 1, currentPage, currentPage + 1])
            }
        }
    }, [filteredLaundries, currentPage])
    
    const selectFilter = label => {
        setSelectedFilter(label)
        setSearchParams({ page: 1 })
    }

    return (
        <section className="laundries w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Daftar Pesanan</div>
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
                        <button type="button" className={`w-full py-2 border-b-2 whitespace-nowrap ${selectedFilter === label ? "border-b-boldPurple" : "border-b"}`} key={index} onClick={() => selectFilter(label)}>{label}</button>
                    ))
                }
                    </div>
                </div>
                <div className="laundry-items w-full flex flex-col gap-2">
                {
                    filteredLaundries.length === 0 &&
                    <span className="mt-4 text-center text-xl font-bold">Daftar pesanan kosong</span>
                }
                {
                    filteredLaundries.length > 0 &&
                    filteredLaundries.slice((currentPage - 1) * laundriesPerPage, currentPage * laundriesPerPage).map((laundry, index) => (
                        <LaundryItem key={index} laundry={laundry} />
                    ))
                }
                </div>
            {
                filteredLaundries.length > 5 &&
                <div className="pagination join shadow-xl">
                {
                    currentPage > 1 ?
                    <button onClick={() => setSearchParams({ page: currentPage - 1 })} className="join-item btn btn-sm">«</button> :
                    <button className="join-item btn btn-sm">«</button>
                }
                {
                    pages.map(item => (
                        <button onClick={() => setSearchParams({ page: item })} className={`join-item btn btn-sm ${currentPage === item ? "btn-primary" : ""}`} key={item}>{item}</button>
                    ))
                }
                {
                    currentPage < Math.ceil(filteredLaundries.length / 5) ?
                    <button onClick={() => setSearchParams({ page: currentPage + 1 })} className="join-item btn btn-sm">»</button> : 
                    <button className="join-item btn btn-sm">»</button>
                }
                </div>
            }
                </>
            }
            </div>
        </section>
    )
}

function LaundryItem({ laundry }){

    const { setLaundries } = useContext(LaundryContext)

    const handleDeleteLaundry = async(e) => {
        e.preventDefault()

        if (confirm("Apakah Anda yakin akan menghapus item ini?")){
            try {

                const laundriesAPIEndpoint = import.meta.env.VITE_LAUNDRIES_API_ENDPOINT
                const token = localStorage.getItem("token")
    
                await axios.delete(`${laundriesAPIEndpoint}/${laundry.id}`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                setLaundries(laundries => laundries.filter(l => l.id !== laundry.id))
                toast.success("Berhasil menghapus pesanan")
            } catch(error){
                toast.error("Gagal menghapus pesanan")
            }
        }
    }

    return (
        <Link to={`/detail/${laundry.id}`} className="laundry-item bg-white flex flex-col rounded-md border-b-2 border-b-boldPurple overflow-hidden shadow-2xl cursor-pointer">
            <div className="top flex items-center justify-between p-2 border-b mobile:flex-col-reverse">
                <div className="mobile:self-start">ID: <span className="font-bold">{laundry.id}</span></div>
                <div className="flex items-center gap-2 mobile:self-end">
                    <div className={`font-bold px-2 py-1 rounded-md text-xs h-fit ${laundry.is_paid ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>{laundry.is_paid ? "Sudah bayar" : "Belum bayar"}</div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" onClick={(e) => e.preventDefault()} className="p-1">
                            <IconDotsVertical stroke={1.5} width={20} height={20} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content flex flex-col mt-2 rounded-md z-[1] bg-white shadow-[0_0_20px_rgb(0,0,0,.2)] overflow-hidden">
                            <Link to={`/edit/${laundry.id}`} className="flex items-center gap-1 p-2 hover:bg-boldPurple/20">
                                <IconEdit stroke={1.5} className="text-primary" />
                                <span>Edit</span>
                            </Link>
                            <button type="button" onClick={handleDeleteLaundry} className="flex items-center gap-1 p-2 hover:bg-boldPurple/20">
                                <IconTrash stroke={1.5} className="text-red-600" />
                                <span>Hapus</span>
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mid flex flex-col gap-2 p-2 my-4">
                <div className="category font-bold text-base flex items-center mobile:text-sm">
                    <IconBottle stroke={1.5} className="text-boldPurple" />
                    <span>Laundry {laundry.category.name} <span className="font-normal text-xs">({getIdCurrency(laundry.category.price)}/kg)</span></span>
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
                <div className="user">Pelanggan: {laundry.user.fullname}</div>
            </div>
            <div className="bottom flex items-end justify-between p-2 text-sm border-t">
                <div className="date text-xs">{getIdDate(laundry.date)}</div>
                <div className="flex flex-col items-end">
                    <span className="mobile:text-xs">Total pembayaran</span>
                    <span className="text-boldPurple font-bold text-base mobile:text-sm">{laundry.weight ? getIdCurrency(laundry.weight * laundry.category.price) : "Rp --"}</span>
                </div>
            </div>
        </Link>
    )
}