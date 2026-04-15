import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import { getIdCurrency } from "../utils/getIdCurrency"
import { getIdDate } from "../utils/getIdDate"
import NotFound from "./NotFound"

export default function DetailLaundry(){
    const { id } = useParams()
    const { login, isAdmin } = useContext(AuthContext)
    
    const [laundry, setLaundry] = useState(null)
    
    useEffect(() => {
        const getLaundry = async() => {
            try {
                const graphQLAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
                const jwt = localStorage.getItem("jwt")

                const { data } = await axios.post(
                    graphQLAPIEndpoint, 
                    {
                        query:
                        `query {
                            order(id: "${id}"){
                                id, status, total_price, date, 
                                category { id, name, price, description }
                                user { id, name, email, phone, address }
                            }
                        }`
                    }, 
                    {
                        headers: {
                            "Authorization": "Bearer " + jwt
                        }
                    }
                )

                if (data.errors){
                    const { message } = data.errors[0]
                    throw new Error(message)
                }

                setLaundry(data.data.order)
            } catch(error){
                console.log(error)
            }
        }

        getLaundry()
    }, [id])
    
    if (login === false || isAdmin === false || (laundry === undefined)){
        return <NotFound />
    }

    if (login === true && isAdmin && laundry !== undefined){
        document.title = "ZenFresh | Order Detail"

        return (
            <>
            <Navbar />
            <Hero page={"Order Detail"} path={"/edit/" + id} />
            <DetailLaundryContainer laundry={laundry} />
            <Footer />
            </>
        )
    }

    return null
}

function DetailLaundryContainer({ laundry }){
    return (
        <section className="edit-laundry-container w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Order detail</div>
            {
                laundry === null &&
                <span className="loading loading-spinner loading-lg bg-boldPurple"></span>
            }
            {
                laundry !== null &&
                <DetailLaundryContent user={laundry.user} laundry={laundry} />
            }
        </section>
    )
}

function DetailLaundryContent({ user, laundry }){
    return (
        <div className="edit-laundry-content w-full flex flex-col rounded-md border-b-2 border-b-boldPurple overflow-hidden shadow-2xl bg-white">
            <div className="edit-laundry-content w-full flex gap-2 p-2 mobile:flex-col mobile:gap-4">
                <div className="laundry-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">ID</div>
                        <div className="value font-bold">{laundry.id}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status</div>
                        <div className={`value font-bold px-2 py-1 rounded-md text-xs w-fit h-fit ${laundry.status === "Completed" ? "text-green-600 bg-green-100" : `${laundry.status === "Cancelled" ? "text-red-600 bg-red-100" : "text-yellow-600 bg-yellow-100"}`}`}>{laundry.status}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Category</div>
                        <div className="value">{laundry.category.name}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Date</div>
                        <div className="value">{getIdDate(laundry.date)}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Total</div>
                        <div className="value font-bold text-boldPurple">{laundry.total_price ? getIdCurrency(laundry.total_price) : "Rp --"}</div>
                    </div>
                </div>
                <div className="user-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">Name</div>
                        <div className="value">{user.name}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Address</div>
                        <div className="value">{user.address || "-"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Phone</div>
                        <div className="value">{user.phone || "-"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}