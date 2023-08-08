import { useRef } from "react"
import logo from "../assets/logo.png"

export default function Navbar(){

    const navLinks = [
        {
            name: "Home",
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
            </svg>
        },
        {
            name: "About",
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-news" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"></path>
                <path d="M8 8l4 0"></path>
                <path d="M8 12l4 0"></path>
                <path d="M8 16l4 0"></path>
            </svg>
        },
        {
            name: "Services",
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-24-hours" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
                <path d="M4 13a8.094 8.094 0 0 0 3 5.24"></path>
                <path d="M11 15h2a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-1a1 1 0 0 0 -1 1v1a1 1 0 0 0 1 1h2"></path>
                <path d="M17 15v2a1 1 0 0 0 1 1h1"></path>
                <path d="M20 15v6"></path>
            </svg>
        },
        {
            name: "Pricing",
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-receipt-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"></path>
                <path d="M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5"></path>
            </svg>
        },
        {
            name: "Contact",
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-address-book" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z"></path>
                <path d="M10 16h6"></path>
                <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M4 8h3"></path>
                <path d="M4 12h3"></path>
                <path d="M4 16h3"></path>
            </svg>
        },
        {
            name: "Login",
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-login rotate-180" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                <path d="M20 12h-13l3 -3m0 6l-3 -3"></path>
            </svg>
        }
    ]

    return (
        <div className="navbar fixed z-10 top-0 bg-[rgb(255,255,255,.2)] backdrop-blur-lg mobile:justify-between">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu flex flex-col gap-2 p-2 h-full bg-white mobile:w-full">
                    <div className="flex p-0 pr-4 flex-row gap-4 items-center justify-start mobile:w-full mobile:justify-between">
                        <div className="flex p-0 bg-transparent hover:bg-transparent">
                            <label htmlFor="my-drawer" className="btn drawer-button btn-square border-none bg-transparent hover:bg-transparent">
                                <span className="h-6 w-6 text-xl hidden justify-center items-center mobile:flex">✕</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current mobile:hidden"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="p-0">
                            <a href="/" className="btn p-0 flex items-center justify-center border-none normal-case text-xl bg-transparent hover:bg-transparent">
                                <img src={logo} alt="Logo" className="w-8" />
                                <span>ZenFresh</span>
                            </a>
                        </div>
                    </div>
                    {
                        navLinks.map((link, index) => {
                            return (
                                <div className={`${link.name === "Home" ? "mt-2" : ""}`} key={index}>
                                    <a className="flex gap-4 p-0 pl-2 rounded-md py-2 hover:bg-[rgb(0,0,0,.1)]" href={`/${link.name.toLowerCase() === "home" ? "" : link.name.toLowerCase()}`}>
                                        {link.svg}
                                        <span className="text-base">{link.name}</span>
                                    </a>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <label htmlFor="my-drawer" className="btn drawer-button btn-square border-none bg-transparent hover:bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div className="flex-1 mobile:flex-none">
                <a href="/" className="btn border-none normal-case text-xl bg-transparent hover:bg-transparent">
                    <img src={logo} alt="Logo" className="w-8" />
                    <span>ZenFresh</span>
                </a>
            </div>
            <div className="flex items-center gap-4 text-sm mobile:hidden">
                <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-mobile" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z"></path>
                        <path d="M11 4h2"></path>
                        <path d="M12 17v.01"></path>
                    </svg>
                    <span>+62 823 5239 5596</span>
                </span>
                <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor"></path>
                    </svg>
                    <span>4 Pemuda Street</span>
                </span>
                <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-hour-3" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        <path d="M12 12h3.5"></path>
                        <path d="M12 7v5"></path>
                    </svg>
                    <span>Mon - Sat: 08:00 - 16:00</span>
                </span>
            </div>
        </div>
    )
}