import { IconBottle, IconChevronLeft } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Calendar from 'react-calendar'
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../contexts/AuthContext"
import goTop from "./goTop"

export default function Appointments(){

    const [date, setDate] = useState(getYesterdayDate())

    const [laundry, setLaundry] = useState({
        date: date,
        category: {}
    })

    useEffect(() => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }

        setLaundry(laundry => ({...laundry, date: date.toLocaleDateString("id-ID", options)}))
    }, [date])

    const tabData = ["Kategori", "Tanggal", "Konfirmasi"]
    const [showTab, setShowTab] = useState(1)

    return (
        <section className="appointments w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold">Pemesanan</div>
            <ul className="steps">
            {
                tabData.map((item, index) => {
                    return <li className={`step step-neutral ${showTab > index ? "step-primary" : "step-neutral"}`} key={index}>{item}</li>
                })
            }
            </ul>
            {showTab === 1 && <ChooseCategories laundry={laundry} setLaundry={setLaundry} setShowTab={setShowTab} />}
            {showTab === 2 && <ChooseDate setLaundry={setLaundry} setShowTab={setShowTab} date={date} setDate={setDate} />}
            {showTab === 3 && <Confirm laundry={laundry} setLaundry={setLaundry} setShowTab={setShowTab} setDate={setDate} />}
        </section>
    )
}

function BackBtn({ handleBackBtn }){
    return (
        <div className="back flex items-center gap-2 cursor-pointer self-start" onClick={handleBackBtn}>
            <IconChevronLeft stroke={1.5} className="text-black" />
            <span>Kembali</span>
        </div>
    )
}

function ChooseCategories({ laundry, setLaundry, setShowTab }){

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        const getAllCategories = async() => {
            try {
                const categoriesAPIEndpoint = import.meta.env.VITE_CATEGORIES_API_ENDPOINT

                const { data: response } = await axios.get(categoriesAPIEndpoint)

                setCategories(response.categories)
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

    const getIDCurrency = total => "Rp " + total.toLocaleString('id-ID')

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
                            <div className="title font-bold text-xl">{category.name}</div>
                            <div className="price-days flex gap-2 items-center text-black/[.7]">
                                {getIDCurrency(category.price)}/kg • {category.duration}
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

const getYesterdayDate = () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    return yesterday
}

function ChooseDate({ setLaundry, setShowTab, date, setDate }){

    function dateDisabled({ date }){
        const yesterday = getYesterdayDate()
        const today = new Date()
        
        if (date.toDateString() === today.toDateString() && today.getHours() >= 18) {
            return true
        }
    
        return date < yesterday 
    }

    const handleChoose = value => {
        setDate(value)

        setShowTab(3)
    }

    const handleBackBtn = () => {
        setDate(getYesterdayDate())
        setLaundry(laundry => ({...laundry, category: ""}))

        setShowTab(1)
    }

    return (
        <div className="date w-full flex flex-col items-center gap-4">
            <BackBtn handleBackBtn={handleBackBtn} />
            <Calendar className="border-none w-full shadow-2xl rounded-md" value={date} onChange={value => handleChoose(value)} tileDisabled={dateDisabled} locale="id-ID" />
        </div>
    )
}

function Confirm({ laundry, setShowTab, setDate }){

    const handleBackBtn = () => {
        setDate(getYesterdayDate())

        setShowTab(2)
    }

    const getIDCurrency = total => "Rp " + total.toLocaleString('id-ID')

    const [isLoading, setIsLoading] = useState(false)

    const { auth, token, login, user } = useContext(AuthContext)

    const handleOrder = async() => {
        try {
            setIsLoading(true)

            const laundriesAPIEndpoint = import.meta.env.VITE_LAUNDRIES_API_ENDPOINT
    
            await axios.post(
                laundriesAPIEndpoint, 
                {
                    ...laundry, 
                    status: "Menunggu konfirmasi",
                    category: laundry.category.id, 
                    start_date: laundry.date,
                    payment_method: "Cash"
                }, 
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            toast.success("Pemesanan berhasil")

            setTimeout(() => {
                toast.info("Mohon menunggu konfirmasi")
            }, 750);

            auth()
            
            setIsLoading(false)
        } catch (error){
            setIsLoading(false)
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
                    <span>Laundry {laundry.category.name}</span>
                </div>
                <div className="info flex flex-col gap-2 pb-4 border-b">
                    <div className="date-drop">Penjemputan pakaian: {laundry.date}</div>
                    <div className="days">Durasi pengerjaan: {laundry.category.duration}</div>
                    <div className="price">{getIDCurrency(laundry.category.price)}/kg</div>
                </div>
                <div className="drop-and-pickup pb-4 border-b">Antar - Jemput oleh kurir <span className="font-bold">(gratis ongkir)</span></div>
                {
                    !handleValidUser() &&
                    <div className="flex flex-col items-end">
                        <Link to={login === false ? "/login" : "/account"} className="px-4 py-2 rounded-md bg-boldPurple text-white self-end" onClick={goTop}>{login === false ? "Login" : "Perbarui akun"}</Link>
                        <span className="text-xs text-red-600">Belum bisa melakukan pemesanan!, {login === false ? "silahkan login terlebih dahulu" : "data alamat atau No HP Anda masih kosong"}</span>
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
                    <button type="button" className="flex items-center justify-center w-36 py-2 rounded-md bg-boldPurple text-white self-end" onClick={handleOrder}>Pesan sekarang</button>
                }
            </div>
        </div>
        </>
    )
}