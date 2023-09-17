import { IconTruckReturn } from "@tabler/icons-react"
import { IconHeartHandshake } from "@tabler/icons-react"
import { IconBottle } from "@tabler/icons-react"
import { IconAlarm } from "@tabler/icons-react"

export default function Plans(){

    const plansData = [
        {
            title: "Choose Any Time For Delivery",
            svg: <IconAlarm stroke={1.5} width={64} height={64} />,
            text: "Select a convenient delivery time that fits your schedule."
        },
        {
            title: "We Wash And Dry Dirty Laundry",
            svg: <IconBottle stroke={1.5} width={64} height={64} /> ,
            text: "Our expert team takes care of washing and drying your soiled garments with precision."
        },
        {
            title: "We Return Your Clean Laundry",
            svg: <IconTruckReturn stroke={1.5} width={64} height={64} />,
            text: "We'll promptly return your laundry, fresh, clean, and ready to wear."
        },
        {
            title: "Relax And Enjoy Clean Clothes",
            svg: <IconHeartHandshake stroke={1.5} width={64} height={64} />,
            text: "Sit back, relax, and relish the luxury of clean, crisp clothes without the hassle."
        }
    ]

    return (
        <section className="plans w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Quick and Easy Laundry</div>
            <div className="plans-items flex gap-4 mobile:flex-col">
            {
                plansData.map((item, index) => {
                    return (
                        <div className="plan flex flex-col items-center justify-between gap-4" key={index}>
                            <div className="img w-fit flex justify-center items-center p-4 rounded-full bg-boldPurple/[.2] text-boldPurple">
                                {item.svg}
                            </div>
                            <div className="title font-bold text-xl text-center">{item.title}</div>
                            <div className="text text-center text-[#555] text-sm">{item.text}</div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}