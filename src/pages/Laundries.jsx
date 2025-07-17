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
import { UnseenLaundryContext } from "../contexts/UnseenLaundyContext";
import { getIdCurrency } from "../utils/getIdCurrency";
import { getIdDate } from "../utils/getIdDate";
import NotFound from "./NotFound";

export default function Laundries(){

    const { login, isAdmin } = useContext(AuthContext)
    const { laundries } = useContext(LaundryContext)

    if (login === false || isAdmin === false){
        return <NotFound />
    }

    if (login === true && isAdmin && laundries){
        document.title = "ZenFresh | Order List"

        return (
            <>
            <Navbar />
            <Hero page={"Order List"} path={"/laundries"} />
            <LaundryContainer laundries={laundries} />
            <Footer />
            </>
        )
    }
}

function LaundryContainer({ laundries }){
    const { setUnseenLaundries } = useContext(UnseenLaundryContext)

    useEffect(() => {
        const markAllSeen = async() => {
            try {
                const token = localStorage.getItem("token")
                const graphqlEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT

                await axios.post(graphqlEndpoint, 
                    {
                        query: 
                        `mutation {
                            mark_all_seen
                        }`
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                )

                setUnseenLaundries(0)
            } catch(error){
                console.log(error)
            }
        }

        markAllSeen()
    }, [])

    const filterLabels = ["All", "Completed"]
    const [selectedFilter, setSelectedFilter] = useState("All")

    const [filteredLaundries, setFilteredLaundries] = useState(laundries)

    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = parseInt(searchParams.get("page") || 1)
    const laundriesPerPage = 5
    const [pages, setPages] = useState([])

    useEffect(() => {
        if (selectedFilter === "All"){
            setFilteredLaundries(laundries)
        } else if (selectedFilter === "Completed"){
            setFilteredLaundries(laundries.filter(laundry => laundry.status === "Completed"))
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
            <div className="title text-3xl font-bold text-center">Order list</div>
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
                        <button type="button" className={`w-full py-2 border-b-2 whitespace-nowrap ${selectedFilter === label ? "border-b-boldPurple" : "border-b-neutral-content"}`} key={index} onClick={() => selectFilter(label)}>{label}</button>
                    ))
                }
                    </div>
                </div>
                <div className="laundry-items w-full flex flex-col gap-2">
                {
                    filteredLaundries.length === 0 &&
                    <span className="mt-4 text-center text-xl font-bold">Order list not found</span>
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

        if (confirm("Are you sure to delete this item?")){
            try {

                const laundriesAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
                const token = localStorage.getItem("token")
    
                await axios.post(laundriesAPIEndpoint, 
                    {
                        query:
                        `mutation {
                            delete_order(id: "${laundry.id}")
                        }`
                    },
                    {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    }
                )

                setLaundries(laundries => laundries.filter(l => l.id !== laundry.id))
                toast.success("Delete order successfully")
            } catch(error){
                toast.error("Delete order failed")
            }
        }
    }

    return (
        <Link to={`/detail/${laundry.id}`} className="laundry-item bg-white flex flex-col rounded-md border-b-2 border-b-boldPurple overflow-hidden shadow-2xl cursor-pointer">
            <div className="top flex items-center justify-between p-2 border-b mobile:flex-col-reverse">
                <div className="mobile:self-start">ID: <span className="font-bold">{laundry.id}</span></div>
                <div className="flex items-center gap-2 mobile:self-end" onClick={(e) => e.preventDefault()}>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="p-1 hover:bg-black/10 rounded-full">
                            <IconDotsVertical stroke={1.5} width={20} height={20} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content flex flex-col mt-2 rounded-md z-[1] bg-white shadow-[0_0_20px_rgb(0,0,0,.2)] overflow-hidden">
                            <Link to={`/edit/${laundry.id}`} className="flex items-center gap-1 p-2 hover:bg-boldPurple/20">
                                <IconEdit stroke={1.5} className="text-primary" />
                                <span>Edit</span>
                            </Link>
                            <button type="button" onClick={handleDeleteLaundry} className="flex items-center gap-1 p-2 hover:bg-boldPurple/20">
                                <IconTrash stroke={1.5} className="text-red-600" />
                                <span>Delete</span>
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mid flex flex-col gap-2 p-2 my-4">
                <div className="category font-bold text-base flex items-center mobile:text-sm">
                    <IconBottle stroke={1.5} className="text-boldPurple" />
                    <span>{laundry.category.name} <span className="font-normal text-xs">({getIdCurrency(laundry.category.price)}/kg)</span></span>
                </div>
                <div className="">
                    Status: 
                    <span className={`value font-bold px-2 py-1 rounded-md text-xs w-fit h-fit ${laundry.status === "Completed" ? "text-green-600 bg-green-100" : `${laundry.status === "Cancelled" ? "text-red-600 bg-red-100" : "text-yellow-600 bg-yellow-100"}`}`}>{laundry.status}</span>
                </div>
                <div className="user">Customer: {laundry.user.name}</div>
            </div>
            <div className="bottom flex items-end justify-between p-2 text-sm border-t">
                <div className="date text-xs">{getIdDate(laundry.date)}</div>
                <div className="flex flex-col items-end">
                    <span className="mobile:text-xs">Total</span>
                    <span className="text-boldPurple font-bold text-base mobile:text-sm">{laundry.total_price ? getIdCurrency(laundry.total_price) : "Rp --"}</span>
                </div>
            </div>
        </Link>
    )
}