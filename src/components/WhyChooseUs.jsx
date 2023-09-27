import { IconPlant } from "@tabler/icons-react";
import { IconShoppingBag } from "@tabler/icons-react";
import { IconTruckDelivery } from "@tabler/icons-react";
import { IconWashMachine } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import goTop from "./goTop";

export default function WhyChooseUs(){

    const whyChooseUsData = [
        {
            title: "Outstanding Laundry Expertise",
            text: "Our team of laundry experts has years of experience in delivering top-notch laundry services. From stain removal to fabric care, we excel in every aspect of garment cleaning. Trust us to revive your clothes and keep them in pristine condition.",
            svg: <IconWashMachine stroke={1.5} className="w-14 h-1/4 mobile:w-10 mobile:h-10" />
        },
        {
            title: "Convenience at Your Fingertips",
            text: "We understand your busy lifestyle, which is why we offer hassle-free scheduling and delivery options. With ZeFfresh, you can enjoy the convenience of clean, fresh clothes without interrupting your daily routine.",
            svg: <IconTruckDelivery stroke={1.5} className="w-14 h-1/4 mobile:w-10 mobile:h-10" />
        },
        {
            title: "Commitment to Sustainability",
            text: "At ZenFresh, we care about the environment. Our laundry practices are eco-friendly, utilizing efficient machines and biodegradable detergents. Join us in our commitment to sustainable living while enjoying clean, fragrant garments.",
            svg: <IconPlant stroke={1.5} className="w-14 h-1/4 mobile:w-10 mobile:h-10" />
        }
    ]

    return (
        <section className="why-choose-us w-[80vw] mx-auto my-32 flex gap-8 mobile:flex-col mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="left flex flex-col gap-4 w-3/5 h-fit sticky top-20 mobile:static mobile:w-full mobile:items-center tablet:w-2/5">
                <div className="title font-bold text-3xl mobile:text-center">Why Choose Us</div>
                <div className="text text-black/[.7] mobile:text-center">At ZenFresh, we take pride in being your go-to laundry service for a myriad of reasons. Our laundry experts bring years of experience to the table, ensuring your clothes receive the best care possible. We understand the importance of convenience in your life, which is why we offer easy scheduling and delivery options.</div>
                <Link to="/order" onClick={goTop} className="flex w-fit rounded-md gap-2 items-center px-4 py-2 bg-boldPurple text-white">
                    <span>Order now</span>
                    <IconShoppingBag stroke={1.5} />
                </Link>
            </div>
            <div className="right flex flex-col gap-8 w-2/5 mobile:w-full tablet:w-3/5">
            {
                whyChooseUsData.map((item, index) => {
                    return (
                        <div className="item flex gap-4" key={index}>
                            <div className="svg p-4 rounded-full flex justify-center items-center bg-boldPurple/[.2] text-boldPurple h-fit">
                                {item.svg}
                            </div>
                            <div className="info flex flex-col gap-2">
                                <div className="title font-bold text-xl">{item.title}</div>
                                <div className="text text-sm">{item.text}</div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}