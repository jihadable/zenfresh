import aboutUs from "../assets/aboutus.jpg"
import aboutUs2 from "../assets/aboutus2.png"

export default function AboutUs(){

    const items = [
        {
            title: "Wash Machines",
            number: 80,
            svg: <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wash-machine text-greenCustome" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
            <path d="M12 14m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
            <path d="M8 6h.01"></path>
            <path d="M11 6h.01"></path>
            <path d="M14 6h2"></path>
            <path d="M8 14c1.333 -.667 2.667 -.667 4 0c1.333 .667 2.667 .667 4 0"></path>
            </svg>
        },
        {
            title: "Outlets",
            number: 3,
            svg: <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-building-warehouse text-greenCustome" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 21v-13l9 -4l9 4v13"></path>
            <path d="M13 13h4v8h-10v-6h6"></path>
            <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3"></path>
            </svg>
        },
        {
            title: "Employees",
            number: 20,
            svg: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users text-greenCustome" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
            </svg>
        }
    ]

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
        <div className="about-company w-[80vw] mx-auto my-32 flex gap-8 mobile:w-full mobile:px-4 mobile:flex-col">
            <div className="img flex w-2/5 mobile:w-full">
                <img src={aboutUs2} alt="Image" className="w-full" />
            </div>
            <div className="content w-3/5 flex flex-col justify-between mobile:w-full">
                <div className="header flex flex-col gap-4">
                    <div className="text-3xl font-bold mobile:text-center">Unwind in Pristine Comfort</div>
                    <div className="text mobile:text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est ipsam ipsa, sit itaque repudiandae, tenetur rerum cum, unde ullam voluptatum quasi molestias maxime amet! Voluptates, illo provident? Consectetur, quo beatae.</div>
                </div>
                <div className="items flex w-full gap-4 mobile:justify-evenly mobile:mt-8">
                {
                    items.map((item, index) => {
                        return (
                            <div className="item flex flex-col items-center" key={index}>
                                {item.svg}
                                <div className="item-number text-4xl font-bold">{item.number}</div>
                                <div className="item-title">{item.title}</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
        </>
    )
}