import { IconChevronLeft, IconSquareCheck } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LaundryContext } from "../contexts/LaundryContext";
import { getIdCurrency } from "../utils/getIdCurrency";
import { getIdDate } from "../utils/getIdDate";
import NotFound from "./NotFound";

export default function EditLaundry(){

    const { id } = useParams()
    const { login, isAdmin } = useContext(AuthContext)
    const { laundries } = useContext(LaundryContext)
    
    const [laundry, setLaundry] = useState(null)
    
    useEffect(() => {
        if (laundries !== null){
            setLaundry(laundries.filter(laundry => laundry.id === id)[0])
        }
    }, [id, laundries])
    
    if (login === false || isAdmin === false || (laundry === undefined && laundries !== null)){
        return <NotFound />
    }

    if (login === true && isAdmin && laundries !== null && laundry !== undefined){
        document.title = "ZenFresh | Edit Order"

        return (
            <>
            <Navbar />
            <Hero page={"Edit Order"} path={"/edit/" + id} />
            <EditLaundryContainer laundry={laundry} />
            <Footer />
            </>
        )
    }
}

function EditLaundryContainer({ laundry }){
    return (
        <section className="edit-laundry-container w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Edit order</div>
            {
                laundry === null &&
                <span className="loading loading-spinner loading-lg bg-boldPurple"></span>
            }
            {
                laundry !== null &&
                <EditLaundryContent user={laundry.user} laundry={laundry} />
            }
        </section>
    )
}

function EditLaundryContent({ user, laundry }){

    const navigate = useNavigate()

    const [statusInput, totalPriceInput] = [useRef(null), useRef(null)]

    const [isLoading, setIsLoading] = useState(false)

    const { setLaundries } = useContext(LaundryContext)
    
    const handleSave = async() => {
        const status = statusInput.current.value
        const totalPrice = totalPriceInput.current.value

        try {
            setIsLoading(true)

            const laundriesAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
            const token = localStorage.getItem("token")

            const { data } = await axios.post(laundriesAPIEndpoint,
                {
                    query:
                    `mutation {
                        update_order(
                            id: "${laundry.id}"
                            status: "${status}"
                            total_price: ${totalPrice}
                        ){
                            id, status, total_price, date, 
                            category { id, name, price, description }
                            user { id, name, email, phone, address }
                        }
                    }`
                },
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            setLaundries(laundries => laundries.map(l => l.id === laundry.id ? data.data.update_order : l))
            toast.success("Update order successfully")

            setIsLoading(false)

            navigate("/laundries")
        } catch(error) {
            toast.error("Update order failed")
            setIsLoading(false)
        }
    }

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
                        <select defaultValue={laundry.status} className="value select select-sm select-primary" ref={statusInput}>
                            <option>Pending confirmation</option>
                            <option>Pickup in progress</option>
                            <option>Processing</option>
                            <option>Delivery in progress</option>
                            <option>Awaiting payment</option>
                            <option>Cancelled</option>
                            <option>Completed</option>
                        </select>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Category</div>
                        <div className="value font-bold">{laundry.category.name} ({getIdCurrency(laundry.category.price)}/kg)</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Total</div>
                        <div>
                            <span>Rp </span>
                            <input type="number" min={0} className="value border border-primary rounded-sm outline-none p-1" defaultValue={laundry.total_price || 0} ref={totalPriceInput} />
                        </div>
                    </div>
                </div>
                <div className="user-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">Customer</div>
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
            <div className="actions flex items-end justify-between p-2">
                <div className="text-sm">{getIdDate(laundry.date)}</div>
                <div className="flex items-center gap-2 self-end">
                    <Link to={"/laundries"} className="cancel flex items-center justify-center w-20 py-1 gap-1 bg-red-600 text-white rounded-md text-sm">
                        <IconChevronLeft stroke={1.5} width={20} height={20} />
                        <span>Cancel</span>
                    </Link>
                    {
                        isLoading ?
                        <div className="flex items-center justify-center w-20 py-1 rounded-md text-white bg-green-600">
                            <span className="loading loading-spinner loading-sm"></span>
                        </div> :
                        <button type="button" className="save flex items-center justify-center w-20 py-1 gap-1 bg-green-600  text-white rounded-md text-sm" onClick={handleSave}>
                            <IconSquareCheck stroke={1.5} width={20} height={20} />
                            <span>Save</span>
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}