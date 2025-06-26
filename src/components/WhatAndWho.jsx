import aboutUs from "../assets/aboutus.jpg"

export default function WhatAndWho(){

    const whatAndWhoData = [
        {
            title: "Who We Are",
            text: "We're more than just a laundry service. We're a team of dedicated professionals who are passionate about delivering exceptional garment care. Our journey began with a vision to provide a laundry experience that combines convenience, quality, and sustainability. With years of expertise in the laundry industry, we've grown to become a trusted name. We're proud of our commitment to customer satisfaction and environmentally conscious practices. Get to know the faces behind Zenfresh and discover a laundry service that cares."
        },
        {
            title: "What We Do",
            text: "Our core mission is simple: to make your life easier and your clothes fresher. We specialize in the art of laundry, offering comprehensive services that include washing, drying, folding, and even specialized care for delicate fabrics. Our efficient pickup and delivery options are designed to fit seamlessly into your schedule, providing you with the convenience you deserve. Beyond cleanliness, we prioritize the longevity of your garments and the well-being of our planet. Through eco-friendly practices and top-notch laundry expertise, we aim to redefine your laundry experience."
        }
    ]

    return (
        <section className="what-and-who w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="img flex">
                <img src={aboutUs} alt="Image" className="w-full h-fit rounded-md" />
            </div>
            <div className="info flex gap-4 mobile:flex-col">
            {
                whatAndWhoData.map((item, index) => {
                    return (
                        <div className="item w-full flex flex-col gap-4" key={index}>
                            <div className="title text-2xl font-bold">{item.title}</div>
                            <div className="text text-black/[.7] text-justify">{item.text}</div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}