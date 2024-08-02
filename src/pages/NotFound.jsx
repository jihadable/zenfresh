import { IconChevronLeft, IconHome } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import goTop from "../utils/goTop"

export default function NotFound(){

    document.title = "ZenFresh | Page Not Found"

    return (
        <section className="not-found w-full h-screen flex justify-center items-center mobile:px-4">
            <div className="content flex flex-col items-center bg-white p-8 rounded-xl shadow-2xl mobile:w-full">
                <div className="text-boldPurple text-7xl font-bold">404</div>
                <div className="text-3xl font-bold">Halaman tidak ditemukan</div>
                <Link to="/" onClick={goTop} className="mt-8 flex gap-2 items-center link-hover text-black">
                    <IconChevronLeft stroke={1.5} width={20} height={20} />
                    <IconHome stroke={1.5} />
                    <span>Beranda</span>
                </Link>
            </div>
        </section>
    )
}