import { IconShoppingBag } from "@tabler/icons-react"
import { IconChevronRight } from "@tabler/icons-react";

export default function HomeHero(){
    return (
        <header className="home-hero w-full h-[100vh] flex flex-col gap-4 justify-center items-center text-white">
            <div className="tagline font-bold text-5xl text-center mobile:text-3xl">Unwind in Pristine Comfort.</div>
            <div className="text text-[#ccc] text-center mobile:px-4">We Care for Your Clothes, So You Can Care for Your Life.</div>
            <div className="btns flex gap-4 mobile:flex-col">
                <a href="/services" className="bg-white flex gap-2 items-center px-4 py-2 text-black rounded-md">
                    <span>Our services</span>
                    <IconChevronRight stroke={1.5} />
                </a>
                <a href="/order" className="bg-boldPurple flex gap-2 items-center text-white px-4 py-2 rounded-md">
                    <span>Order now</span>
                    <IconShoppingBag stroke={1.5} />
                </a>
            </div>
        </header>
    )
}