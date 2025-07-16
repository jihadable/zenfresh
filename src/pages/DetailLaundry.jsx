import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import { LaundryContext } from "../contexts/LaundryContext"
import { getIdCurrency } from "../utils/getIdCurrency"
import { getIdDate } from "../utils/getIdDate"
import { wsClient } from "../utils/graphqlws"
import NotFound from "./NotFound"

export default function DetailLaundry(){
    const { id } = useParams()
    const { login, isAdmin } = useContext(AuthContext)
    const { laundries } = useContext(LaundryContext)

    const subscribeUpdateLaundry = (id, callback) => {
        return wsClient.subscribe(
            {
                query: `
                    subscription ($id: ID!) {
                        order_updated(id: $id) {
                            id, status, total_price, date, 
                            category { id, name, price, description }
                            user { id, name, email, phone, address }
                        }
                    }
                `,
                variables: { id },
            },
            {
                next: ({ data }) => {
                    if (data?.order_updated) {
                        callback(data.order_updated)
                    }
                },
                error: (err) => console.error("Subscription error:", err),
                complete: () => console.log("Subscription complete")
            }
        )
    }
    
    const [laundry, setLaundry] = useState(null)
    
    useEffect(() => {
        if (laundries !== null){
            setLaundry(laundries.filter(laundry => laundry.id === id)[0])
        }
    }, [id, laundries])

    useEffect(() => {
        if (laundry){
            const dispose = subscribeUpdateLaundry(laundry.id, (updatedLaundry) => {
                setLaundry(updatedLaundry)
            });

            return () => {
                if (typeof dispose === "function") {
                    dispose()
                } else if (dispose?.unsubscribe) {
                    dispose.unsubscribe()
                }
            }
        }
    }, [laundry])
    
    if (login === false || isAdmin === false || (laundry === undefined && laundries !== null)){
        return <NotFound />
    }

    if (login === true && isAdmin && laundries !== null && laundry !== undefined){
        document.title = "ZenFresh | Order Detail"

        return (
            <>
            <Navbar />
            <Hero page={"Detail Pesanan"} path={"/edit/" + id} />
            <DetailLaundryContainer laundry={laundry} />
            <Footer />
            </>
        )
    }
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