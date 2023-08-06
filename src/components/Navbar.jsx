import logo from "../assets/logo.png"

export default function Navbar(){
    return (
        <div className="navbar fixed bg-base-100">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            {/* <div className="drawer-content"> */}
                {/* Page content here */}
                {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
            {/* </div>  */}
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
            <div className="flex-none">
                <button htmlFor="my-drawer" className="btn btn-square drawer-button border-none hover:bg-[rgb(0,0,0,.1)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
            <div className="flex-1">
                <a href="/" className="btn border-none normal-case text-xl">
                    <img src={logo} alt="Logo" className="w-8" />
                    <span>ZenFresh</span>
                </a>
            </div>
            <div className="flex items-center gap-4 text-sm">
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