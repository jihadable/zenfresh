import { IconBottle, IconChevronLeft, IconCurrencyDollar } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Calendar from 'react-calendar'
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import mandiri from "../assets/mandiri.png"
import ovo from "../assets/ovo.png"
import qris from "../assets/qris.png"
import { AuthContext } from "../contexts/AuthContext"
import goTop from "./goTop"

export default function Appointments(){

    const [date, setDate] = useState(getYesterdayDate())

    const [laundry, setLaundry] = useState({
        date: date,
        category: "",
        payment_method: "Cash",
        is_self_drop: false,
        is_self_pickup: false
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
                    return <li className={`step ${showTab > index ? "step-primary" : ""}`} key={index}>{item}</li>
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

    const categoriesData = [
        {
            title: "Biasa",
            days: 2,
            price: 4
        },
        {
            title: "Kilat",
            days: 1,
            price: 7
        },
        {
            title: "Premium",
            days: "Kurang dari 1",
            price: 10   
        }
    ]

    const handleChoose = (category) => {
        setLaundry(laundry => ({...laundry, category: category}))

        setShowTab(2)
    }

    const handleBackBtn = () => {
        setLaundry(laundry => ({...laundry, outlet: ""}))

        setShowTab(0)
    }

    return (
        <div className="categories w-full flex flex-col items-center gap-4">
            <BackBtn handleBackBtn={handleBackBtn} />
            <div className="categories-items w-full grid grid-cols-2 gap-4 mobile:flex mobile:flex-col">
            {
                categoriesData.map((item, index) => {
                    return (
                        <div className={`item w-full p-4 flex items-center gap-4 rounded-md shadow-2xl cursor-pointer ${laundry.category.title === item.title ? "bg-boldPurple text-white" : "bg-white"}`} key={index} onClick={() => handleChoose(item)}>
                            <IconBottle stroke={1.5} width={48} height={48} className={`${laundry.category.title === item.title ? "text-black" : "text-boldPurple"}`} />
                            <div className="info flex flex-col">
                                <div className="title font-bold text-xl">{item.title}</div>
                                <div className="price-days flex gap-2 items-center text-black/[.7]">
                                    Rp.{item.price}.000/kg • {item.days} hari
                                </div>
                            </div>
                        </div>
                    )
                })
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

function Confirm({ laundry, setLaundry, setShowTab, setDate }){

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

    const handleBackBtn = () => {
        setDate(getYesterdayDate())

        setShowTab(2)
    }

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
                    category: laundry.category.title, 
                    start_date: laundry.date
                }, 
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            toast.success("Pemesanan laundry berhasil")

            setTimeout(() => {
                toast.info("Mohon menunggu")
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
                <div className="title text-xl font-bold pb-4 border-b">Laundry {laundry.category.title}</div>
                <div className="info flex flex-col gap-2 pb-4 border-b">
                    <div className="date-drop">Penjemputan pakaian: {laundry.date}</div>
                    <div className="days">Durasi pengerjaan: {laundry.category.days} hari</div>
                    <div className="price">Rp.{laundry.category.price}.000/kg</div>
                </div>
                <div className="shipping-options pb-4 border-b">
                    <div className="text-sm">Opsi Pengiriman (dikenakan ongkir)</div>
                    <div className="checkboxes flex gap-4 items-center">
                        <label className="label cursor-pointer flex gap-2" htmlFor="drop">
                            <input type="checkbox" id="drop" className="checkbox checkbox-primary" checked={laundry.is_self_drop} onChange={() => setLaundry(laundry => ({...laundry, is_self_drop: !laundry.is_self_drop}))} />
                            <span className="label-text">Bawa sendiri</span> 
                        </label>
                        <label className="label cursor-pointer flex gap-2" htmlFor="pickup">
                            <input type="checkbox" id="pickup" className="checkbox checkbox-primary" checked={laundry.is_self_pickup} onChange={() => setLaundry(laundry => ({...laundry, is_self_pickup: !laundry.is_self_pickup}))} />
                            <span className="label-text">Ambil sendiri</span> 
                        </label>
                    </div>
                </div>
                <div className="payment-methods flex flex-col gap-4">
                    <div className="title">Metode pembayaran:</div>
                    <div className="flex flex-wrap gap-4">
                    {
                        paymentMethodsData.map((item, index) => (
                            <div className={`item flex justify-center items-center cursor-pointer p-2 rounded-md border-2 ${laundry.payment_method === item.title ? "border-primary" : ""}`} key={index} onClick={() => setLaundry(laundry => ({...laundry, payment_method: item.title}))}>
                                {item.title != "Cash" && <img src={item.img} alt="Payment method" className="h-4" loading="lazy" />}
                                {item.title == "Cash" && <span className="flex"><IconCurrencyDollar stroke={1.5} />{item.title}</span>}
                            </div>
                        ))
                    }
                    </div>
                </div>
                {
                    !handleValidUser() &&
                    <div className="flex flex-col items-end">
                        <Link to={login === false ? "/login" : "/account"} className="px-4 py-2 rounded-md bg-boldPurple text-white self-end" onClick={goTop}>{login === false ? "Login" : "Perbarui akun"}</Link>
                        <span className="text-xs text-red-600">Belum bisa melakukan pemesanan!, {login === false ? "silahkan login terlebih dahulu" : "data alamat atau No HP Anda masih kosong"}</span>
                    </div>
                }
                {
                    handleValidUser() &&
                    <button type="button" className="flex items-center justify-center w-36 py-2 rounded-md bg-boldPurple text-white self-end" onClick={handleOrder}>
                    {
                        isLoading ? 
                        <span className="loading loading-spinner loading-md"></span> :
                        "Pesan sekarang"
                    }
                    </button>
                }
            </div>
        </div>
        </>
    )
}