import { IconHomeCheck } from "@tabler/icons-react"
import Calendar from 'react-calendar';
import "../Calender.css"
import { useState } from "react";
import { IconBottle } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect } from "react";
import dana from "../assets/dana.png"
import mandiri from "../assets/mandiri.png"
import ovo from "../assets/ovo.png"
import bri from "../assets/bri.png"
import bni from "../assets/bni.png"
import linkaja from "../assets/linkaja.png"
import spay from "../assets/spay.png"
import qris from "../assets/qris.png"
import bca from "../assets/bca.png"
import gopay from "../assets/gopay.png"
import paypal from "../assets/paypal.png"

export default function Appointments(){

    const [date, setDate] = useState(new Date())

    const [schedule, setSchedule] = useState({
        outlet: "",
        date: date,
        category: ""
    })

    useEffect(() => {
        setSchedule(schedule => ({...schedule, date: date}))
    }, [date])

    const tabData = ["Outlets", "Date", "Categories", "Confirm"]
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
            {showTab === 1 && <ChooseDate schedule={schedule} setSchedule={setSchedule} setShowTab={setShowTab} date={date} setDate={setDate} />}
            {showTab === 2 && <ChooseCategories schedule={schedule} setSchedule={setSchedule} setShowTab={setShowTab} />}
            {showTab === 3 && <Confirm schedule={schedule} setSchedule={setSchedule} setShowTab={setShowTab} />}
        </section>
    )
}

function Btns({showBackBtn, showNextBtn, handleBackBtn, handleNextBtn}){
    return (
        <div className={`btns w-full flex items-center ${showBackBtn && showNextBtn ? "justify-between" : ""} ${!showBackBtn && showNextBtn ? "justify-end" : ""} mt-4 gap-4`}>
        {
            showBackBtn &&
            <div className="back flex items-center gap-2 cursor-pointer" onClick={handleBackBtn}>
                <IconChevronLeft stroke={1.5} className="text-black" />
                <span>Back</span>
            </div>
        }
        {
            showNextBtn &&
            <div className="next flex items-center gap-2 cursor-pointer" onClick={handleNextBtn}>
                <span>Next</span>
                <IconChevronRight stroke={1.5} className="text-black" />
            </div>
        }
        </div>
    )
}

function ChooseOutlet({ schedule, setSchedule, setShowTab }){

    const outletData = [
        {
            title: "Yogyakarta",
            address: "123 Main Street"
        },
        {
            title: "Sleman",
            address: "456 Elm Avenue"
        },
        {
            title: "Bantul",
            address: "789 Oak Lane"
        },
        {
            title: "Kulon Progo",
            address: "101 Pine Road"
        }
    ]

    function handleChoose(outlet){
        setSchedule(schedule => ({...schedule, outlet: outlet}))
    }

    const handleNextBtn = () => {
        if (schedule.outlet !== ""){
            setShowTab(1)
        }
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
            <Btns showBackBtn={false} showNextBtn={true} handleNextBtn={handleNextBtn} />
        </div>
    )
}

function dateDisabled({ date }){
    let day = new Date()
    day.setDate(day.getDate() - 1)
    
    return date < day 
}

function ChooseDate({ setShowTab, date, setDate }){

    const handleBackBtn = () => {
        setDate(new Date())

        setShowTab(0)
    }

    const handleNextBtn = () => {
        setShowTab(2)
    }

    return (
        <div className="date w-full flex flex-col items-center gap-4">
            <Calendar className="border-none w-full shadow-2xl rounded-md" value={date} onChange={setDate} tileDisabled={dateDisabled} />
            <Btns showBackBtn={true} showNextBtn={true} handleBackBtn={handleBackBtn} handleNextBtn={handleNextBtn} />
        </div>
    )
}

function ChooseCategories({ schedule, setSchedule, setShowTab }){

    const categoriesData = [
        {
            title: "Basic Laundry",
            days: 3,
            price: 3
        },
        {
            title: "Rapid Fast",
            days: 2,
            price: 7
        },
        {
            title: "Premium",
            days: 1,
            price: 10   
        }
    ]

    const handleChoose = (category) => {
        setSchedule(schedule => ({...schedule, category: category}))
    }

    const handleBackBtn = () => {
        setSchedule(schedule => ({...schedule, category: ""}))

        setShowTab(1)
    }

    const handleNextBtn = () => {
        if (schedule.category !== ""){
            setShowTab(3)
        }
    }

    return (
        <div className="categories w-full flex flex-col items-center gap-4">
            <div className="categories-items w-full grid grid-cols-2 gap-4 mobile:flex mobile:flex-col">
            {
                categoriesData.map((item, index) => {
                    return (
                        <div className={`item w-full p-4 flex items-center gap-4 rounded-md shadow-2xl cursor-pointer ${schedule.category.title === item.title ? "bg-boldPurple text-white" : "bg-white"}`} key={index} onClick={() => handleChoose(item)}>
                            <IconBottle stroke={1.5} width={48} height={48} className={`${schedule.category.title === item.title ? "text-black" : "text-boldPurple"}`} />
                            <div className="info flex flex-col">
                                <div className="title font-bold text-xl">{item.title}</div>
                                <div className="price-days flex gap-2 items-center text-black/[.7]">
                                    ${item.price}/kg • {item.days} days
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
            <Btns showBackBtn={true} showNextBtn={true} handleBackBtn={handleBackBtn} handleNextBtn={handleNextBtn} />
        </div>
    )
}

function Confirm({ schedule, setSchedule, setShowTab }){

    const paymentMethodsData = [dana, qris, bca, mandiri, ovo, bri, gopay, bni, linkaja, spay, paypal]

    const [paymentMethodsIndex, setPaymentMethodsIndex] = useState(null)

    const [initalPrice, setInitialPrice] = useState(schedule.category.price)

    const handleBackBtn = () => {
        setSchedule(schedule => ({...schedule, category: {...schedule.category, price: initalPrice}}))

        setShowTab(2)
    }

    const [isSelfPickUp, setIsSelfPickUp] = useState(false)
    const [isSelfDrop, setIsSelfDrop] = useState(false)

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

    return (
        <>
        <div className="confirm w-full flex flex-col gap-4">
            <div className="confirm-info flex flex-col p-4 gap-4 rounded-md bg-white shadow-2xl">
                <div className="title text-xl font-bold pb-4 border-b">{schedule.category.title}</div>
                <div className="info flex flex-col gap-2 pb-4 border-b">
                    <div className="outlet">{schedule.outlet.title} • {schedule.outlet.address}</div>
                    <div className="date">{schedule.date.toDateString()}</div>
                    <div className="days">{schedule.category.days} days</div>
                    <div className="price">${schedule.category.price}/kg</div>
                </div>
                <div className="checkboxes flex gap-4 items-center">
                    <label className="label cursor-pointer flex gap-2" htmlFor="pickup">
                        <input type="checkbox" id="pickup" className="checkbox checkbox-primary" checked={isSelfPickUp} onChange={handleChangeSelfPickUp} />
                        <span className="label-text">Self pick up</span> 
                    </label>
                    <label className="label cursor-pointer flex gap-2" htmlFor="drop">
                        <input type="checkbox" id="drop" className="checkbox checkbox-primary" checked={isSelfDrop} onChange={handleChangeSelfDrop} />
                        <span className="label-text">Self drop</span> 
                    </label>
                </div>
                <div className="payment-methods flex flex-col gap-4">
                    <div className="title">Payment method:</div>
                    <div className="flex flex-wrap gap-4">
                    {
                        paymentMethodsData.map((item, index) => {
                            return (
                                <div className={`item flex cursor-pointer p-2 rounded-md border-2 ${paymentMethodsIndex === index ? "border-primary" : ""}`} key={index} onClick={() => setPaymentMethodsIndex(index)}>
                                    <img src={item} alt="Payment" className="h-4" loading="lazy" />
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <button className="px-4 py-2 rounded-md bg-boldPurple text-white self-end">Order</button>
            </div>
            <Btns showBackBtn={true} showNextBtn={false} handleBackBtn={handleBackBtn} />
        </div>
        </>
    )
}

