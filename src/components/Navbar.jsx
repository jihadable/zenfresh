import { IconBottle, IconChevronDown, IconLogout, IconMenu2, IconMessage, IconUserCircle, IconX } from "@tabler/icons-react"
import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import { AuthContext } from "../contexts/AuthContext"
import { LaundryContext } from "../contexts/LaundryContext"
import goTop from "../utils/goTop"

export default function Navbar(){

    const linksData = [
        {
            path: "/",
            title: "Beranda"
        },
        {
            path: "/about",
            title: "Tentang"
        },
        {
            path: "/services",
            title: "Layanan"
        },
        {
            path: "/order",
            title: "Pesan"
        }
    ]

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const mobileMenuBtn = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!mobileMenuBtn.current.contains(e.target)) {
                setShowMobileMenu(false)
            }
        }
    
        document.addEventListener("click", handleClickOutside)
    
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    const navigate = useNavigate()
    
    const { login, setLogin, isAdmin, user, setUser } = useContext(AuthContext)
    const { setLaundries } = useContext(LaundryContext)

    const handleLogout = () => {
        localStorage.removeItem("token")
        setLogin(false)
        setUser(null)
        setLaundries(null)

        navigate("/")

        goTop()
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
                linksData.filter(link => isAdmin ? link.path !== "/order" : link).map((item, index) => (
                    <Link to={item.path} onClick={goTop} className="transition duration-100 hover:text-boldPurple" key={index}>{item.title}</Link>
                ))
            }
            {
                login &&
                <>
                <Link to={"/account"} onClick={goTop} className="hidden mobile:block transition duration-100 hover:text-boldPurple">Akun</Link>
            {
                isAdmin === false &&   
                <Link to={"/history"} onClick={goTop} className="hidden mobile:block transition duration-100 hover:text-boldPurple">Pesanan Saya</Link>
            }
            {
                isAdmin &&
                <>
                <Link to={"/laundries"} onClick={goTop} className="hidden mobile:block transition duration-100 hover:text-boldPurple">Daftar Pesanan</Link>
                <Link to={"/reviews"} onClick={goTop} className="hidden mobile:block transition duration-100 hover:text-boldPurple">Ulasan</Link>
                </>
            }
                <button type="button" className="hidden mobile:block transition duration-100 text-red-600" onClick={handleLogout}>Logout</button>
                </>
            }
            </div>
            <div className="extra flex items-center gap-4">
            {
                login === null &&
                <span className="loading loading-spinner loading-md bg-boldPurple"></span>
            }
            {
                login &&
                <div className="dropdown dropdown-end mobile:hidden">
                    <div tabIndex={0} role="button" className="flex items-center gap-1 bg-black/[.1] rounded-full p-1" >
                        <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${isAdmin ? "_a" : user.fullname}`} alt="Image" className="w-8 rounded-full" />
                        <IconChevronDown width={16} height={16} />
                    </div>
                    <ul tabIndex={0} className="dropdown-content flex flex-col mt-1 rounded-md z-[1] bg-white shadow-[0_0_20px_rgb(0,0,0,.2)] overflow-hidden">
                        <Link to={"/account"} onClick={goTop} className="flex items-center gap-1 px-2 py-2 hover:bg-boldPurple/20">
                            <IconUserCircle stroke={1.5} className="text-boldPurple" />
                            <span>Akun</span>
                        </Link>
                    {
                        isAdmin === false &&   
                        <Link to={"/history"} onClick={goTop} className="flex items-center gap-1 px-2 py-2 hover:bg-boldPurple/20">
                            <IconBottle stroke={1.5} className="text-boldPurple" />
                            <span className="whitespace-nowrap">Pesanan Saya</span>
                        </Link>
                    }
                    {
                        isAdmin &&
                        <>
                        <Link to={"/laundries"} onClick={goTop} className="flex items-center gap-1 px-2 py-2 hover:bg-boldPurple/20">
                            <IconBottle stroke={1.5} className="text-boldPurple" />
                            <span className="whitespace-nowrap">Daftar Pesanan</span>
                        </Link>
                        <Link to={"/reviews"} onClick={goTop} className="flex items-center gap-1 px-2 py-2 hover:bg-boldPurple/20">
                            <IconMessage stroke={1.5} className="text-boldPurple" />
                            <span className="whitespace-nowrap">Ulasan</span>
                        </Link>
                        </>
                    }
                        <button type="button" className="flex items-center gap-1 px-2 py-2 hover:bg-boldPurple/20 text-red-600" onClick={handleLogout}>
                            <IconLogout stroke={1.5} />
                            <span>Logout</span>
                        </button>
                    </ul>
                </div>
            }
            {
                login === false &&
                <Link to="/login" className="login-btn px-4 py-2 bg-boldPurple text-white rounded-md">Login</Link>
            }
            {
                login &&
                <Link to={"/account"} onClick={goTop} className="mobile-account hidden mobile:flex">
                    <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${isAdmin ? "_a" : user.fullname}`} alt="Image" className="w-10 rounded-full" />
                </Link>
            }
                <div className="mobile-menu-btn hidden hover:text-boldPurple cursor-pointer mobile:flex" onClick={() => {setShowMobileMenu(!showMobileMenu)}} ref={mobileMenuBtn}>
                    <IconMenu2 stroke={1.5} />
                </div>
            </div>
            <div className={`overlay absolute z-40 top-0 left-0 right-0 h-[100vh] bg-black/[.5] hidden ${showMobileMenu ? "active" : ""}`}></div>
        </nav>
    )
}