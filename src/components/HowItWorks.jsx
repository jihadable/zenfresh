import howItWorks from "../assets/how-it-works.jpg"

export default function HowItWorks(){

    const items = ["Choose Any Time For Delivery", "We Can Wash And Dry Dirty Laundry", "We Return Your Clean Laundry", "Relax And Enjoy Clean Clothes"]

    return (
        <section className="how-it-works flex pb-8 mobile:flex-col tablet:flex-col">
            <div className="img">
                <img src={howItWorks} alt="Image" className="w-full" />
            </div>
            <div className="explanations p-6 bg-lightBlue flex flex-col gap-2">
                <div className="header text-3xl">How It Works</div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus cumque officia quia est, nemo nam voluptatem consequatur. Similique commodi placeat deserunt consequuntur laudantium non minima maxime, illum architecto aspernatur.</p>
                <div className="content flex flex-wrap">
                    <ul className="steps steps-vertical">
                    {
                        items.map((item, index) => {
                            return <li className="step step-neutral" key={index}>{item}</li>
                        })
                    }
                    </ul>
                </div>
            </div>
        </section>
    )
}