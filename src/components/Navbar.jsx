import { IconMenu2 } from "@tabler/icons-react"
import logo from "../assets/logo.png"
import { IconX } from "@tabler/icons-react"
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import goTop from "./goTop"

export default function Navbar(){

    const linksData = [
        {
            path: "/",
            title: "Home"
        },
        {
            path: "/about",
            title: "About"
        },
        {
            path: "/services",
            title: "Services"
        },
        {
            path: "/order",
            title: "Order"
        }
    ]

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const mobileMenuBtn = useRef(null)

    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!mobileMenuBtn.current.contains(e.target)){
                setShowMobileMenu(false)
            }
        })
    }, [])

    return (
        <nav className="navbar fixed z-30 top-0 left-0 right-0 flex items-center justify-between px-[10vw] py-2 bg-white shadow-md mobile:px-4 tablet:px-[5vw]">
            <div className="logo flex">
                <img src={logo} alt="Logo" className="w-12" />
            </div>
            <div className={`links flex items-center gap-8 mobile:absolute mobile:top-0 mobile:flex-col mobile:items-end mobile:p-4 mobile:bg-white mobile:z-50 mobile:transition mobile:duration-300 mobile:h-[100vh] mobile:w-[60%] ${showMobileMenu ? "active" : ""}`}>
                <div className="close-mobile-menu-btn hidden hover:text-boldPurple cursor-pointer mobile:flex" onClick={() => setShowMobileMenu(false)}>
                    <IconX stroke={1.5} />
                </div>
            {
                linksData.map((item, index) => {
                    return (
                        <Link to={item.path} onClick={goTop} className="transition duration-100 hover:text-boldPurple mobile:text-xl" key={index}>{item.title}</Link>
                    )
                })
            }
            </div>
            <div className="extra flex items-center gap-4">
                <Link to="/login" className="login-btn px-4 py-2 bg-boldPurple text-white rounded-md">Login</Link>
                <div className="mobile-menu-btn hidden hover:text-boldPurple cursor-pointer mobile:flex" onClick={() => {setShowMobileMenu(!showMobileMenu)}} ref={mobileMenuBtn}>
                    <IconMenu2 stroke={1.5} />
                </div>
            </div>
            <div className={`overlay absolute z-40 top-0 left-0 right-0 h-[100vh] bg-black/[.5] hidden ${showMobileMenu ? "active" : ""}`}></div>
        </nav>
    )
}