import howItWorks from "../assets/how-it-works.jpg"

export default function HowItWorks(){

    const items = ["Choose Any Time For Delivery", "We Can Wash And Dry Dirty Laundry", "We Return Your Clean Laundry", "Relax And Enjoy Clean Clothes"]

    return (
        <section className="how-it-works flex pb-8 mobile:flex-col tablet:flex-col">
            <div className="img">
                <img src={howItWorks} alt="Image" className="w-full" />
            </div>
            <div className="explanations p-6 bg-lightBlue flex flex-col gap-4">
                <div className="header text-3xl">How It Works</div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus cumque officia quia est, nemo nam voluptatem consequatur. Similique commodi placeat deserunt consequuntur laudantium non minima maxime, illum architecto aspernatur.</p>
                <div className="content flex flex-wrap gap-y-4 mt-8">
                {
                    items.map((item, index) => {
                        return (
                            <div className="item w-1/2 flex flex-col mobile:p-1" key={index}>
                                <div className="number w-8 h-8 rounded-full bg-darkBlue flex justify-center items-center text-white">{index+1}</div>
                                <div className="text font-bold">{item}</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </section>
    )
}