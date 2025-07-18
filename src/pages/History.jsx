import { IconBottle } from "@tabler/icons-react"
import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import { LaundryContext } from "../contexts/LaundryContext"
import { getIdCurrency } from "../utils/getIdCurrency"
import { getIdDate } from "../utils/getIdDate"
import NotFound from "./NotFound"

export default function History(){

    const { login, isAdmin } = useContext(AuthContext)
    const { laundries } = useContext(LaundryContext)

    if (login === false || isAdmin){
        return <NotFound />
    }
    
    if (login === true && isAdmin === false && laundries){
        document.title = "ZenFresh | Order History"
        
        return (
            <>
            <Navbar />
            <Hero page={"Order History"} path={"/history"} />
            <OrderHistory laundries={laundries} />
            <Footer />
            </>
        )
    }

    return null
}

function OrderHistory({ laundries }){

    const filterLabels = ["All", "Completed"]
    const [selectedFilter, setSelectedFilter] = useState("All")

    const [filteredLaundries, setFilteredLaundries] = useState(laundries)

    useEffect(() => {
        if (selectedFilter === "All"){
            setFilteredLaundries(laundries)
        } else if (selectedFilter === "Completed"){
            setFilteredLaundries(laundries.filter(laundry => laundry.status === "Completed"))
        }
    }, [laundries, selectedFilter])

    return (
        <section className="order-history-container w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Order history</div>
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
                        <button type="button" className={`w-full py-2 border-b-2 whitespace-nowrap ${selectedFilter === label ? "border-b-boldPurple" : "border-b-neutral-content"}`} key={index} onClick={() => setSelectedFilter(label)}>{label}</button>
                    ))
                }
                    </div>
                </div>
                <div className="history-items w-full flex flex-col gap-2">
                {
                    filteredLaundries.length === 0 &&
                    <span className="mt-4 text-center text-xl font-bold">History not found</span>

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
    
    const { setLaundries } = useContext(LaundryContext)

    return (
        <div className="history-item bg-white flex flex-col rounded-md border-b-2 border-b-boldPurple shadow-2xl text-sm mobile:text-xs">
            <div className="top flex items-center justify-between p-2 border-b">
                <div className="">ID: <span className="font-bold">{laundry.id}</span></div>
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
            </div>
            <div className="bottom flex items-end justify-between p-2 text-sm border-t">
                <div className="date text-xs">{getIdDate(laundry.date)}</div>
                <div className="flex flex-col items-end">
                    <span className="mobile:text-xs">Total</span>
                    <span className="text-boldPurple font-bold text-base mobile:text-sm">{laundry.total_price ? getIdCurrency(laundry.total_price) : "Rp --"}</span>
                </div>
            </div>
        </div>
    )
}