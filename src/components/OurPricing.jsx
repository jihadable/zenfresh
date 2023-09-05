export default function OurPricing(){

    const prices = [
        {
            title: "basic",
            price: 100,
        },
        {
            title: "standard",
            price: 250,
        },
        {
            title: "exclusive",
            price: 375,
        }
    ]

    const priceItems = ["Dry clean (per item)", "Wash, dry & fold", "Ironing (per item)", "Personal laundress", "Customizable services","Free pickup & delivery"]

    return (
        <section className="pricing flex justify-center gap-4 mx-auto my-12 mobile:flex-col mobile:px-4 tablet:flex-wrap">
        {
            prices.map((price, index) => {
                return (
                    <div className="price card flex flex-col items-center gap-6 p-8 border-2 border-lightBlue mobile:p-4 mobile:w-full" key={index}>
                        <div className="title uppercase font-bold">{price.title}</div>
                        <div className="price"><span className="font-bold text-3xl text-darkBlue">${price.price}</span>/mo</div>
                        <div className="items flex flex-col gap-2">
                        {
                            priceItems.map((item, index) => {
                                return (
                                    <div className="item flex gap-4 items-center" key={index}>
                                        <div className="checklist flex rounded-full p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check text-greenCustome" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M5 12l5 5l10 -10"></path>
                                            </svg>
                                        </div>
                                        <div className="item">{item}</div>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <a href="/login" className="btn bg-greenCustome hover:bg-greenCustome text-white">Buy Now</a>
                    </div>
                )
            })
        }
        </section>
    )
}