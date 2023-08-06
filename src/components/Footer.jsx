import logo from "../assets/logo.png"

export default function Footer(){
    return (
        <footer className="footer bg-greenCustome flex flex-col p-8 mt-20 text-base">
            <div className="top flex w-full justify-between">
                <div className="flex flex-col gap-2 items-center">
                    <img src={logo} alt="Logo" className="w-16" />
                    <div className="tagline font-bold text-xl text-darkBlue">Unwind in Pristine Comfort</div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="footer-title">Services</span> 
                    <a className="link link-hover">Drop off Laundry</a>
                    <a className="link link-hover">Free Pick-Up and Delivery</a> 
                    <a className="link link-hover">Eco-Friendly Products</a> 
                    <a className="link link-hover">Fast & High Quality</a>
                </div> 
                <div className="flex flex-col">
                    <span className="footer-title">Social Media</span> 
                    <div className="sosmed-links flex gap-4 text-darkBlue">
                        <a className="link link-hover">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                <path d="M16.5 7.5l0 .01"></path>
                            </svg>
                        </a> 
                        <a className="link link-hover">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-tikto-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M16.083 2h-4.083a1 1 0 0 0 -1 1v11.5a1.5 1.5 0 1 1 -2.519 -1.1l.12 -.1a1 1 0 0 0 .399 -.8v-4.326a1 1 0 0 0 -1.23 -.974a7.5 7.5 0 0 0 1.73 14.8l.243 -.005a7.5 7.5 0 0 0 7.257 -7.495v-2.7l.311 .153c1.122 .53 2.333 .868 3.59 .993a1 1 0 0 0 1.099 -.996v-4.033a1 1 0 0 0 -.834 -.986a5.005 5.005 0 0 1 -4.097 -4.096a1 1 0 0 0 -.986 -.835z" stroke-width="0" fill="currentColor"></path>
                            </svg>
                        </a>
                        <a className="link link-hover">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-youtube-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M18 3a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-12a5 5 0 0 1 -5 -5v-8a5 5 0 0 1 5 -5zm-9 6v6a1 1 0 0 0 1.514 .857l5 -3a1 1 0 0 0 0 -1.714l-5 -3a1 1 0 0 0 -1.514 .857z" stroke-width="0" fill="currentColor"></path>
                            </svg>
                        </a>
                    </div>
                </div> 
            </div>
            <div className="bottom flex justify-between w-full border-t pt-4">
                <div>© 2023 ZenFresh</div>
                <div className="flex gap-8">
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Terms of service</a>
                </div>
            </div>
        </footer>
    )
}