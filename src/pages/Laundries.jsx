import { IconEdit, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import qris from "../assets/qris.png";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

export default function Laundries(){

    document.title = "ZenFresh | Daftar Laundry"

    const { login, isAdmin } = useContext(AuthContext)

    if (login === false || isAdmin === false){
        return <NotFound />
    }

    if (login === true && isAdmin){
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

    const filterLabels = ["Semua", "Belum Bayar", "Sedang Dikerjakan", "Selesai"]

    const [selectedFilter, setSelectedFilter] = useState("Semua")

    const { laundries } = useContext(AuthContext)

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
        let firstPage = 1
        let lastPage = Math.ceil(filteredLaundries.length / 5)
        
        if (filteredLaundries.length <= 10){
            setPages([1,2])
        }
        else if (filteredLaundries.length > 10){

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

    const [isLoading, setIsLoading] = useState(false)

    const getIDCurrency = total => "Rp " + total.toLocaleString('id-ID')

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
                        <div className="value font-bold">{laundry.id}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status</div>
                        <div className={`value font-bold px-2 py-1 rounded-md text-xs w-fit h-fit ${laundry.status === "Selesai" ? "text-green-600 bg-green-100" : `${laundry.status === "Menunggu pembayaran" ? "text-red-600 bg-red-100" : "text-yellow-600 bg-yellow-100"}`}`}>{laundry.status}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Kategori</div>
                        <div className="value">{laundry.category.name} ({getIDCurrency(laundry.category.price)}/kg)</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Berat total(kg)</div>
                        <div className="value">{laundry.weight || "--"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Tanggal mulai</div>
                        <div className="value">{laundry.start_date}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Tanggal selesai</div>
                        <div className="value">{laundry.end_date || "--"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Metode pembayaran</div>
                        <div className="value">
                        {
                            laundry.payment_method === "Cash" ? 
                            "Cash" : 
                            <img src={qris} alt="QRIS" className="w-10" />
                        }
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Total pembayaran</div>
                        <div className="value">{laundry.weight ? getIDCurrency(laundry.weight * laundry.category.price) : "Rp --"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status pembayaran</div>
                        <div className={`value font-bold px-2 py-1 rounded-md text-xs w-fit h-fit ${laundry.is_paid ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>{laundry.is_paid ? "Sudah bayar" : "Belum bayar"}</div>
                    </div>
                </div>
                <div className="user-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">Nama lengkap Pelanggan</div>
                        <div className="value">{user.fullname}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Alamat</div>
                        <div className="value">{user.address || "--"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">No HP</div>
                        <div className="value">{user.no_hp || "--"}</div>
                    </div>
                </div>
            </div>
            <div className="actions flex items-center gap-2 p-2 self-end">
                <Link to={"/edit/" + laundry.id} type="button" className="edit flex items-center justify-center gap-1 p-1 w-20 text-sm rounded-md bg-boldPurple text-white">
                    <IconEdit stroke={1.5} width={20} height={20} />
                    <span>Edit</span>
                </Link>
                {
                    isLoading ?
                    <div className="flex items-center justify-center w-20 py-1 rounded-md text-white bg-red-600">
                        <span className="loading loading-spinner loading-sm"></span>
                    </div> :
                    <button type="button" className="delete flex items-center justify-center gap-1 py-1 w-20 text-sm rounded-md bg-red-600 text-white" onClick={handleDeleteLaundry}>
                        <IconTrash stroke={1.5} width={20} height={20} />
                        <span>Hapus</span>
                    </button>
                }
            </div>
        </div>
    )
}