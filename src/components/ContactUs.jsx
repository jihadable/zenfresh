export default function ContactUs(){
    return (
        <section className="contact w-[50vw] flex flex-col mx-auto my-12 items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="header flex flex-col gap-2">
                <div className="phone flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                    </svg>
                    <span>+62 823 5239 5596</span>
                </div>
                <div className="email flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                        <path d="M3 7l9 6l9 -6"></path>
                    </svg>
                    <span>zenfresh@gmail.com</span>
                </div>
                <div className="location flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor"></path>
                    </svg>
                    <span>4, Pemuda Street</span>
                </div>
                <div className="opening-hours flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-hour-3" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        <path d="M12 12h3.5"></path>
                        <path d="M12 7v5"></path>
                    </svg>
                    <span>Mon - Sat: 08:00 - 16:00</span>
                </div>
            </div>
            <div className="content flex flex-col w-full">
                <div className="header text-2xl font-bold text-center">
                    <div>Your thoughts are important to us</div>
                    <div>Feel free to drop us a message</div>
                </div>
                <form action="" className="w-full flex flex-col gap-6">
                    <div className="name flex flex-col">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" className="p-4 outline-none border-l-4 border-greenCustome rounded-md" />
                    </div>
                    <div className="email flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="p-4 outline-none border-l-4 border-greenCustome rounded-md" />
                    </div>
                    <div className="message flex flex-col">
                        <label htmlFor="message">Tell Us about it</label>
                        <textarea id="message" rows="7" className="p-4 outline-none border-l-4 border-greenCustome rounded-md resize-none"></textarea>
                    </div>
                    <button className="btn w-fit self-center bg-greenCustome hover:bg-greenCustome">
                        <span>Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail-share" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M13 19h-8a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6"></path>
                            <path d="M3 7l9 6l9 -6"></path>
                            <path d="M16 22l5 -5"></path>
                            <path d="M21 21.5v-4.5h-4.5"></path>
                        </svg>
                    </button>
                </form>
            </div>
        </section>
    )
}