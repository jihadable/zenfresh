import { IconHomeCheck, IconChevronLeft, IconBottle } from "@tabler/icons-react"
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import "../Calender.css"
// import { PDFDownloadLink } from "@react-pdf/renderer"
// import dana from "../assets/dana.png"
import mandiri from "../assets/mandiri.png"
import ovo from "../assets/ovo.png"
// import bri from "../assets/bri.png"
// import bni from "../assets/bni.png"
// import linkaja from "../assets/linkaja.png"
// import spay from "../assets/spay.png"
import qris from "../assets/qris.png"
import { IconCurrencyDollar } from "@tabler/icons-react";
// import bca from "../assets/bca.png"
// import gopay from "../assets/gopay.png"
// import paypal from "../assets/paypal.png"
// import PaymentReceipt from "./PaymentReceipt";
// import { IconDownload } from "@tabler/icons-react";

export default function Appointments(){

    const [date, setDate] = useState(getYesterdayDate())

    const [schedule, setSchedule] = useState({
        outlet: "",
        date: date,
        category: ""
    })

    useEffect(() => {
        setSchedule(schedule => ({...schedule, date: date}))
    }, [date])

    // const tabData = ["Outlets", "Date", "Categories", "Confirm"]
    const tabData = ["Cabang", "Tanggal", "Kategori", "Konfirmasi"]
    const [showTab, setShowTab] = useState(0)

    return (
        <section className="appointments w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold">Appointments</div>
            <ul className="steps">
            {
                tabData.map((item, index) => {
                    return <li className={`step ${showTab >= index ? "step-primary" : ""}`} key={index}>{item}</li>
                })
            }
            </ul>
            {showTab === 0 && <ChooseOutlet schedule={schedule} setSchedule={setSchedule} setShowTab={setShowTab} />}
            {showTab === 1 && <ChooseDate setSchedule={setSchedule} setShowTab={setShowTab} date={date} setDate={setDate} />}
            {showTab === 2 && <ChooseCategories schedule={schedule} setSchedule={setSchedule} setShowTab={setShowTab} setDate={setDate} />}
            {showTab === 3 && <Confirm schedule={schedule} setSchedule={setSchedule} setShowTab={setShowTab} />}
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

function ChooseOutlet({ schedule, setSchedule, setShowTab }){

    const outletData = [
        {
            title: "Yogyakarta",
            // address: "123 Main Street"
            address: "Jl. Salak No. 8"
        },
        {
            title: "Sleman",
            // address: "456 Elm Avenue"
            address: "Jl. Rambutan No. 17"
        },
        {
            title: "Bantul",
            // address: "789 Oak Lane"
            address: "Jl. Pepaya No. 9"
        },
        {
            title: "Kulon Progo",
            // address: "101 Pine Road"
            address: "Jl. Durian No. 23"
        },
        {
            title: "Gunung Kidul",
            // address: "264 Nume Boulevard"
            address: "Jl. Cempedak No. 3"
        }
    ]

    function handleChoose(outlet){
        setSchedule(schedule => ({...schedule, outlet: outlet}))

        setShowTab(1)
    }

    return (
        <div className="outlets w-full flex flex-col items-center gap-4">
            <div className="outlets-items w-full grid grid-cols-2 gap-4 mobile:flex mobile:flex-col">
            {
                outletData.map((item, index) => {
                    return (
                        <div className={`outlet flex items-center gap-4 rounded-md shadow-2xl p-4 cursor-pointer ${schedule.outlet.title === item.title ? "bg-boldPurple text-white" : "bg-white"}`} key={index} onClick={() => handleChoose(item)}>
                            <IconHomeCheck stroke={1.5} width={48} height={48} className={`${schedule.outlet.title === item.title ? "text-black" : "text-boldPurple"}`} />
                            <div className="info flex flex-col">
                                <div className="title font-bold text-xl">{item.title}</div>
                                <div className="address text-black/[.7]">{item.address}</div>
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

function dateDisabled({ date }){
    const yesterday = getYesterdayDate()
    
    return date < yesterday 
}

function ChooseDate({ setSchedule, setShowTab, date, setDate }){

    const handleChoose = value => {
        setDate(value)

        setShowTab(2)
    }

    const handleBackBtn = () => {
        setDate(getYesterdayDate())

        setSchedule(schedule => ({...schedule, outlet: ""}))

        setShowTab(0)
    }

    return (
        <div className="date w-full flex flex-col items-center gap-4">
            <BackBtn handleBackBtn={handleBackBtn} />
            <Calendar className="border-none w-full shadow-2xl rounded-md" value={date} onChange={value => handleChoose(value)} tileDisabled={dateDisabled} locale="id-ID" />
        </div>
    )
}

function ChooseCategories({ schedule, setSchedule, setShowTab, setDate }){

    const categoriesData = [
        {
            // title: "Basic Laundry",
            title: "Biasa",
            days: 2,
            price: 4
        },
        {
            // title: "Rapid Fast",
            title: "Kilat",
            days: 1,
            price: 7
        },
        {
            title: "Premium",
            days: "< 1",
            price: 10   
        }
    ]

    const handleChoose = (category) => {
        setSchedule(schedule => ({...schedule, category: category}))

        setShowTab(3)
    }

    const handleBackBtn = () => {
        setDate(getYesterdayDate())
        setSchedule(schedule => ({...schedule, category: ""}))

        setShowTab(1)
    }

    return (
        <div className="categories w-full flex flex-col items-center gap-4">
            <BackBtn handleBackBtn={handleBackBtn} />
            <div className="categories-items w-full grid grid-cols-2 gap-4 mobile:flex mobile:flex-col">
            {
                categoriesData.map((item, index) => {
                    return (
                        <div className={`item w-full p-4 flex items-center gap-4 rounded-md shadow-2xl cursor-pointer ${schedule.category.title === item.title ? "bg-boldPurple text-white" : "bg-white"}`} key={index} onClick={() => handleChoose(item)}>
                            <IconBottle stroke={1.5} width={48} height={48} className={`${schedule.category.title === item.title ? "text-black" : "text-boldPurple"}`} />
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

function Confirm({ schedule, setSchedule, setShowTab }){

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
            title: "Bank mandiri", 
            img: mandiri
        },
        {
            title: "OVO", 
            img: ovo
        }
    ]

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash")

    const handleBackBtn = () => {
        setSchedule(schedule => ({...schedule, category: ""}))

        setShowTab(2)
    }

    const [isSelfPickUp, setIsSelfPickUp] = useState(false)
    const [isSelfDrop, setIsSelfDrop] = useState(false)

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    function handleChangeSelfPickUp(){
        if (!isSelfPickUp){
            setSchedule(schedule => ({...schedule, category: {...schedule.category, price: schedule.category.price - 1}}))
        }
        
        else {
            setSchedule(schedule => ({...schedule, category: {...schedule.category, price: schedule.category.price + 1}}))
        }

        setIsSelfPickUp(!isSelfPickUp)
    }

    function handleChangeSelfDrop(){
        if (!isSelfDrop){
            setSchedule(schedule => ({...schedule, category: {...schedule.category, price: schedule.category.price - 1}}))
        }
        
        else {
            setSchedule(schedule => ({...schedule, category: {...schedule.category, price: schedule.category.price + 1}}))
        }

        setIsSelfDrop(!isSelfDrop)
    }

    // function createPickUpDate(){
    //     const pickUpDate = new Date(schedule.date)
    //     const daysAfter = schedule.category.days

    //     pickUpDate.setDate(schedule.date.getDate() + daysAfter)

    //     return pickUpDate.toLocaleDateString("id-ID", options)
    // }

    function createTextOnWhatsApp(){
        const text = 
        `Halo, Saya ingin laundry di Zenfresh Laundry. %0ACabang: ${schedule.outlet.title} • ${schedule.outlet.address}%0AKategori: ${schedule.category.title}%0ATanggal: ${schedule.date.toLocaleDateString("id-ID", options)}%0AMetode pembayaran: ${selectedPaymentMethod}`

        return text
    } 

    return (
        <>
        <div className="confirm w-full flex flex-col gap-4">
            <BackBtn handleBackBtn={handleBackBtn} />
            <div className="confirm-info flex flex-col p-4 gap-4 rounded-md bg-white shadow-2xl">
                <div className="title text-xl font-bold pb-4 border-b">{schedule.category.title}</div>
                <div className="info flex flex-col gap-2 pb-4 border-b">
                    <div className="outlet">{schedule.outlet.title} • {schedule.outlet.address}</div>
                    <div className="date">{schedule.date.toLocaleDateString("id-ID", options)}</div>
                    <div className="days">{schedule.category.days} hari</div>
                    <div className="price">Rp.{schedule.category.price}.000/kg</div>
                </div>
                <div className="checkboxes flex gap-4 items-center">
                    <label className="label cursor-pointer flex gap-2" htmlFor="pickup">
                        <input type="checkbox" id="pickup" className="checkbox checkbox-primary" checked={isSelfPickUp} onChange={handleChangeSelfPickUp} />
                        <span className="label-text">Ambil sendiri</span> 
                    </label>
                    <label className="label cursor-pointer flex gap-2" htmlFor="drop">
                        <input type="checkbox" id="drop" className="checkbox checkbox-primary" checked={isSelfDrop} onChange={handleChangeSelfDrop} />
                        <span className="label-text">Bawa sendiri</span> 
                    </label>
                </div>
                <div className="payment-methods flex flex-col gap-4">
                    <div className="title">Metode pembayaran:</div>
                    <div className="flex flex-wrap gap-4">
                    {
                        paymentMethodsData.map((item, index) => {
                            return (
                                <div className={`item flex justify-center items-center cursor-pointer p-2 rounded-md border-2 ${selectedPaymentMethod === item.title ? "border-primary" : ""}`} key={index} onClick={() => setSelectedPaymentMethod(item.title)}>
                                    {item.title != "Cash" && <img src={item.img} alt="Payment" className="h-4" loading="lazy" />}
                                    {item.title == "Cash" && <span className="flex"><IconCurrencyDollar stroke={1.5} />{item.title}</span>}
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <a href={`https://api.whatsapp.com/send?phone=6285323247634&text=${createTextOnWhatsApp()}`} className="px-4 py-2 rounded-md bg-boldPurple text-white self-end">Order now</a>
                {/* <PDFDownloadLink 
                className="px-4 py-2 rounded-md bg-boldPurple text-white self-end" 
                document={
                <PaymentReceipt 
                outletAddress={`${schedule.outlet.title}, ${schedule.outlet.address}`} 
                category={schedule.category.title} 
                dropDate={schedule.date.toDateString()} 
                pickUpDate={createPickUpDate()} 
                price={schedule.category.price} 
                paymentMethod={paymentMethodsData[paymentMethodsIndex]} />
                } 
                fileName="zenfresh_payment_receipt">
                    {({ loading }) =>
                        loading ? "Loading..." : <div className="flex gap-2">
                            <IconDownload stroke={1.5} />
                            <span>Payment Receipt</span>
                        </div>
                    }
                </PDFDownloadLink> */}
            </div>
        </div>
        </>
    )
}