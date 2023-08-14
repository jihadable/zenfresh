import aboutUs from "../assets/aboutus.jpg"

export default function AboutUs(){
    return (
        <>
        <section className="about flex flex-col gap-6 w-[80vw] items-center mx-auto my-12 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="img flex">
                <img src={aboutUs} alt="Image" className="w-full" />
            </div>
            <div className="content w-full flex gap-4 justify-between mobile:flex-col">
                <div className="who">
                    <div className="header font-bold text-2xl">Who We Are -</div>
                    <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, soluta consectetur! Vel, quibusdam. Dolor repellat quam ratione nesciunt eveniet amet pariatur aliquid maxime illo! Tenetur.</div>
                </div>
                <div className="what">
                    <div className="header font-bold text-2xl">What We Do -</div>
                    <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum cumque aspernatur repellat consequatur. Tempore officia maxime quod vero? Harum, dolores sequi laboriosam earum pariatur quas.</div>
                </div>
            </div>
        </section>
        <div className="history-target flex flex-col w-[80vw] overflow-hidden mx-auto my-32 rounded-br-2xl rounded-tl-2xl mobile:w-full mobile:rounded-none tablet:w-[90vw]">
            <div className="history flex mobile:flex-col">
                <div className="header w-1/2 flex flex-col justify-center items-center mobile:w-full mobile:py-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-history text-redCustome" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 8l0 4l2 2"></path>
                        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path>
                    </svg>
                    <div className="text-xl font-bold">Our History {">"}</div>
                </div>
                <div className="content w-1/2 bg-lightBlue px-4 py-2 rounded-bl-lg text-justify mobile:w-full">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, quis! Sunt cum repudiandae laudantium itaque, illo earum nemo excepturi libero quos dolore quibusdam, nesciunt sed natus consequuntur sit architecto ipsam officia, pariatur rerum facilis commodi assumenda exercitationem officiis. Soluta sunt qui debitis obcaecati molestiae dolorem accusantium eos veniam cupiditate quae.</div>
            </div>
            <div className="target flex flex-row-reverse mobile:flex-col">
                <div className="header w-1/2 flex flex-col justify-center items-center mobile:w-full mobile:py-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-target-arrow text-redCustome" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                        <path d="M12 7a5 5 0 1 0 5 5"></path>
                        <path d="M13 3.055a9 9 0 1 0 7.941 7.945"></path>
                        <path d="M15 6v3h3l3 -3h-3v-3z"></path>
                        <path d="M15 9l-3 3"></path>
                    </svg>
                    <div className="text-xl font-bold">{"<"} Our Target</div>
                </div>
                <div className="content w-1/2 bg-lightBlue px-4 py-2 rounded-tr-lg text-justify mobile:w-full">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni facere nobis, earum dicta, molestias in suscipit fugit officiis consequuntur maxime nam modi ratione incidunt assumenda? Dignissimos, possimus! Reiciendis, dignissimos suscipit praesentium nam perspiciatis cupiditate non atque pariatur hic eius voluptas impedit nihil saepe in. Sunt, possimus exercitationem. In, commodi.</div>
            </div>
        </div>
        </>
    )
}