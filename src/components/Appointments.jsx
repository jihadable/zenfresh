import { IconBottle, IconChevronLeft } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../contexts/AuthContext"
import { LaundryContext } from "../contexts/LaundryContext"
import { getIdCurrency } from "../utils/getIdCurrency"
import { getIdDate } from "../utils/getIdDate"
import goTop from "../utils/goTop"

export default function Appointments(){
    const [laundry, setLaundry] = useState({
        category: {}
    })

    const tabData = ["Category", "Confirmation"]
    const [showTab, setShowTab] = useState(1)

    return (
        <section className="appointments w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold">Order</div>
            <ul className="steps">
            {
                tabData.map((item, index) => {
                    return <li className={`step ${showTab > index ? "step-primary" : ""}`} key={index}>{item}</li>
                })
            }
            </ul>
            {showTab === 1 && <ChooseCategories laundry={laundry} setLaundry={setLaundry} setShowTab={setShowTab} />}
            {showTab === 2 && <Confirm laundry={laundry} setLaundry={setLaundry} setShowTab={setShowTab} />}
        </section>
    )
}

function BackBtn({ handleBackBtn }){
    return (
        <div className="back flex items-center gap-2 cursor-pointer self-start" onClick={handleBackBtn}>
            <IconChevronLeft stroke={1.5} className="text-black" />
            <span>Back</span>
        </div>
    )
}

function ChooseCategories({ laundry, setLaundry, setShowTab }){

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        const getAllCategories = async() => {
            try {
                const categoriesAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT

                const { data } = await axios.post(categoriesAPIEndpoint, {
                    query: 
                    `query {
                        categories { id, name, price, description }
                    }`
                })

                setCategories(data.data.categories)
            } catch (error){
                console.log(error)
            }
        }

        getAllCategories()
    }, [])

    const handleChoose = (category) => {
        setLaundry(laundry => ({...laundry, category: category}))

        setShowTab(2)
    }

    return (
        <div className="categories w-full flex flex-col items-center gap-4">
            <div className="categories-items w-full grid grid-cols-2 gap-4 mobile:flex mobile:flex-col">
            {
                categories === null &&
                [1,2,3,4].map(item => (
                    <div className="item w-full p-4 flex items-center gap-4 rounded-md shadow-2xl bg-white" key={item}>
                        <IconBottle stroke={1.5} width={48} height={48} className="text-boldPurple" />
                        <div className="info flex flex-col gap-2">
                            <div className="title font-bold text-xl w-20 h-6 bg-boldPurple/[.2]"></div>
                            <div className="price-days flex gap-2 items-center text-black/[.7] w-40 h-5 bg-boldPurple/[.2]"></div>
                        </div>
                    </div>
                ))
            }
            {
                categories !== null &&
                categories.map((category, index) => (
                    <div className={`item w-full p-4 flex items-center gap-4 rounded-md shadow-2xl cursor-pointer ${laundry.category.name === category.name ? "bg-boldPurple text-white" : "bg-white"}`} key={index} onClick={() => handleChoose(category)}>
                        <IconBottle stroke={1.5} width={48} height={48} className={`${laundry.category.name === category.name ? "text-black" : "text-boldPurple"}`} />
                        <div className="info flex flex-col">
                            <div className="title font-bold text-xl">{category.name} <span className="text-base font-normal">• {getIdCurrency(category.price)}/kg</span></div>
                            <div className="price-days flex gap-2 items-center text-black/[.7]">
                                {category.description}
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

function Confirm({ laundry, setShowTab, setLaundry }){

    const handleBackBtn = () => {
        setLaundry(laundry => ({...laundry, category: {}}))

        setShowTab(1)
    }

    const [isLoading, setIsLoading] = useState(false)
    const { login, user } = useContext(AuthContext)
    const { laundries, setLaundries } = useContext(LaundryContext)

    const handleOrder = async() => {
        try {
            if (user.is_email_verified === false){
                toast.warn("Email not verified")

                return
            }

            setIsLoading(true)

            const laundriesAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
            const jwt = localStorage.getItem("jwt")
    
            const { data } = await axios.post(
                laundriesAPIEndpoint, 
                {
                    query:
                    `mutation {
                        post_order(category: "${laundry.category.id}"){
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

            toast.success("Order placed")

            setTimeout(() => {
                toast.info("Please wait for confirmation")
            }, 750);
            
            setIsLoading(false)
        } catch (error){
            console.log(error)
            setIsLoading(false)
            toast.error("Order fail")
        }
    }

    const handleValidUser = () => {
        if (user === null || login === false) return false
        
        if (user.address === null || user.no_hp === null) return false

        return true
    }

    return (
        <>
        <div className="confirm w-full flex flex-col gap-4">
            <BackBtn handleBackBtn={handleBackBtn} />
            <div className="confirm-info flex flex-col p-4 gap-4 rounded-md bg-white shadow-2xl">
                <div className="title text-xl font-bold pb-4 border-b flex items-center gap-2">
                    <IconBottle stroke={1.5} className="text-boldPurple w-8 h-8" />
                    <span>{laundry.category.name}</span>
                </div>
                <div className="info flex flex-col gap-2 pb-4 border-b">
                    <div className="date-drop">Date: {getIdDate(new Date())}</div>
                    <div className="desc">{laundry.category.description}</div>
                    <div className="price font-bold text-primary">{getIdCurrency(laundry.category.price)}/kg</div>
                </div>
                <div className="drop-and-pickup pb-4 border-b">Pick up - delivery by courier <span className="font-bold">(free)</span></div>
                {
                    !handleValidUser() &&
                    <div className="flex flex-col items-end">
                        <Link to={login === false ? "/login" : "/account"} className="px-4 py-2 rounded-md bg-boldPurple text-white self-end" onClick={goTop}>{login === false ? "Login" : "Perbarui akun"}</Link>
                        <span className="text-xs text-red-600">Can not place order!, {login === false ? "please login" : "address or phone number is still empty"}</span>
                    </div>
                }
                { 
                    handleValidUser() && isLoading &&
                    <div className="flex items-center justify-center px-[60px] py-2 rounded-md text-white bg-boldPurple w-fit self-end">
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                }
                {
                    handleValidUser() && !isLoading &&
                    <button type="button" className="flex items-center justify-center w-36 py-2 rounded-md bg-boldPurple text-white self-end" onClick={handleOrder}>Order now</button>
                }
            </div>
        </div>
        </>
    )
}