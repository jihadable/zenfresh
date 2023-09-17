import { IconHomeCheck } from "@tabler/icons-react"
import Calendar from 'react-calendar';
import "../Calender.css"
import { useState } from "react";
import { useEffect } from "react";
import { IconBottle } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";

export default function Appointments(){
    let today = new Date()

    const [schedule, setSchedule] = useState({
        outlet: "",
        date: today,
        category: ""
    })

    useEffect(() => {
        console.log(schedule)
    }, [schedule])

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
            <div className="back flex items-center self-start gap-2 cursor-pointer" onClick={() => {showTab > 0 ? setShowTab(showTab - 1) : ""}}>
                <IconChevronLeft stroke={1.5} />
                <span className="link-hover">Back</span>
            </div>
            {showTab === 0 && <ChooseOutlet setSchedule={setSchedule} setShowTab={setShowTab} />}
            {showTab === 1 && <ChooseDate setSchedule={setSchedule} date={today} setShowTab={setShowTab} />}
            {showTab === 2 && <ChooseCategories setSchedule={setSchedule} setShowTab={setShowTab} />}
            {showTab === 3 && <Confirm schedule={schedule} />}
        </section>
    )
}

function ChooseOutlet({ setSchedule, setShowTab }){

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
        setSchedule(schedule => {
            return {...schedule, outlet: outlet}
        })

        setShowTab(1)
    }

    return (
        <div className="outlets w-full grid grid-cols-2 gap-4 mobile:flex mobile:flex-col">
        {
            outletData.map((item, index) => {
                return (
                    <div className="outlet flex items-center gap-4 rounded-md shadow-2xl p-4 bg-white cursor-pointer" key={index} onClick={() => handleChoose(item)}>
                        <IconHomeCheck stroke={1.5} width={48} height={48} className="text-boldPurple" />
                        <div className="info flex flex-col">
                            <div className="title font-bold text-xl">{item.title}</div>
                            <div className="address text-black/[.7]">{item.address}</div>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}


function ChooseDate({ date, setSchedule, setShowTab }){

    const handleChoose = (value) => {
        setSchedule(schedule => {
            return {...schedule, date: value}
        })

        setShowTab(2)
    }

    return (
        <div className="date w-full flex justify-center">
            <Calendar className="border-none w-full shadow-2xl rounded-md" value={date} onChange={(value) => handleChoose(value)} />
        </div>
    )
}

function ChooseCategories({ setSchedule, setShowTab }){

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
        setSchedule(schedule => {
            return {...schedule, category: category}
        })

        setShowTab(3)
    }

    return (
        <div className="categories w-full flex items-center gap-4 mobile:flex-col">
        {
            categoriesData.map((item, index) => {
                return (
                    <div className="item w-full p-4 flex items-center gap-4 rounded-md bg-white shadow-2xl cursor-pointer" key={index} onClick={() => handleChoose(item)}>
                        <IconBottle stroke={1.5} width={48} height={48} className="text-boldPurple" />
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
    )
}

function Confirm({ schedule }){

    console.log(schedule)

    return (
        <div className="confirm w-full flex flex-col p-4 gap-4 rounded-md bg-white shadow-2xl">
            <div className="title text-xl font-bold pb-4 border-b">{schedule.category.title}</div>
            <div className="info flex flex-col gap-2 pb-4 border-b">
                <div className="outlet">{schedule.outlet.title} • {schedule.outlet.address}</div>
                <div className="date">{schedule.date.toDateString()}</div>
                <div className="days">{schedule.category.days} days</div>
                <div className="price">${schedule.category.price}/kg</div>
            </div>
            <div className="checkboxes flex gap-4 items-center">
                <label className="label cursor-pointer flex gap-2" htmlFor="pickup">
                    <input type="checkbox" id="pickup" className="checkbox checkbox-primary" />
                    <span className="label-text">Self pick up</span> 
                </label>
                <label className="label cursor-pointer flex gap-2" htmlFor="drop">
                    <input type="checkbox" id="drop" className="checkbox checkbox-primary" />
                    <span className="label-text">Self drop</span> 
                </label>
            </div>
            <button className="px-4 py-2 rounded-md bg-boldPurple text-white self-end">Order</button>
        </div>
    )
}

