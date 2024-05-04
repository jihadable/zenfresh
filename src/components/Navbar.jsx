import { IconBottle, IconHistory, IconLogout, IconMenu2, IconUserCircle, IconX } from "@tabler/icons-react"
import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import { AuthContext } from "../contexts/AuthContext"
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
            title: "Pesan"
        }
    ]

    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const accountMenuBtn = useRef(null)
    const mobileMenuBtn = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!accountMenuBtn.current.contains(e.target)) {
                setShowAccountMenu(false)
            }

            if (!mobileMenuBtn.current.contains(e.target)) {
                setShowMobileMenu(false)
            }
        }
    
        document.addEventListener("click", handleClickOutside)
    
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    const { setToken, login, isAdmin, user } = useContext(AuthContext)

    const avatarName = () => {
        const arrFullname = user.fullname.split(" ")
        
        if (arrFullname.length === 1) return arrFullname[0]

        return arrFullname[0] + "+" + arrFullname[1]
    }

    const handleLogout = () => {
        localStorage.removeItem("token")

        setToken(localStorage.getItem("token"))
    }

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
                linksData.map((item, index) => (
                    <Link to={item.path} onClick={goTop} className="transition duration-100 hover:text-boldPurple" key={index}>{item.title}</Link>
                ))
            }
                <Link to={"/account"} className="hidden mobile:block transition duration-100 hover:text-boldPurple">Akun</Link>
            {
                isAdmin === false &&   
                <Link to={"/history"} className="hidden mobile:block transition duration-100 hover:text-boldPurple">History</Link>
            }
            {
                isAdmin &&
                <Link to={"/laundries"} className="hidden mobile:block transition duration-100 hover:text-boldPurple">Laundries</Link>
            }
                <button type="button" className="hidden mobile:block transition duration-100 hover:text-boldPurple" onClick={handleLogout}>Logout</button>
            </div>
            <div className="extra flex items-center gap-4">
            {
                login &&
                <div className="account-container flex relative mobile:hidden">
                    <button type="button" onClick={() => setShowAccountMenu(!showAccountMenu)} ref={accountMenuBtn}>
                        <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${isAdmin ? "_a" : avatarName()}`} alt="Image" className="w-10 rounded-full" />
                    </button>
                    <div className={`account-menu absolute ${showAccountMenu ? "flex" : "hidden"} flex-col w-40 bg-white shadow-[0_0_30px_rgb(0,0,0,.3)] rounded-md top-[105%] right-0 py-1`}>
                        <Link to={"/account"} className="flex items-center gap-1 px-2 py-2 hover:bg-boldPurple/20">
                            <IconUserCircle stroke={1.5} className="text-boldPurple" />
                            <span>Akun</span>
                        </Link>
                    {
                        isAdmin === false &&   
                        <Link to={"/history"} className="flex items-center gap-1 px-2 py-2 hover:bg-boldPurple/20">
                            <IconHistory stroke={1.5} className="text-boldPurple" />
                            <span>History</span>
                        </Link>
                    }
                    {
                        isAdmin &&
                        <Link to={"/laundries"} className="flex items-center gap-1 px-2 py-2 hover:bg-boldPurple/20">
                            <IconBottle stroke={1.5} className="text-boldPurple" />
                            <span>Laundry</span>
                        </Link>
                    }
                        <button type="button" className="flex items-center gap-1 px-2 py-2 hover:bg-boldPurple/20" onClick={handleLogout}>
                            <IconLogout stroke={1.5} className="text-boldPurple" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            }
            {
                login === false &&
                <Link to="/login" className="login-btn px-4 py-2 bg-boldPurple text-white rounded-md">Login</Link>
            }
                <div className="mobile-menu-btn hidden hover:text-boldPurple cursor-pointer mobile:flex" onClick={() => {setShowMobileMenu(!showMobileMenu)}} ref={mobileMenuBtn}>
                    <IconMenu2 stroke={1.5} />
                </div>
            </div>
            <div className={`overlay absolute z-40 top-0 left-0 right-0 h-[100vh] bg-black/[.5] hidden ${showMobileMenu ? "active" : ""}`}></div>
        </nav>
    )
}