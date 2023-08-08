import dryCleaning from "../assets/dry-cleaning.jpg"
import ironing from "../assets/ironing.jpg"
import stainRemoval from "../assets/stain-removal.jpg"

export default function Features(){

    const features = [
        {
            img: dryCleaning,
            title: "Dry Cleaning",
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing.`
        },
        {
            img: ironing,
            title: "Pressing and Ironing",
            text: `Lorem ipsum dolor sit amet consectetur adipisicing.`
        },
        {
            img: stainRemoval,
            title: "Stain Removal",
            text: `Lorem ipsum dolor, sit amet consectetur adipisicing.`
        }
    ]

    return (
        <section className="features flex flex-col items-center gap-8 my-16 mobile:px-4">
            <div className="header text-3xl">Features</div>
            <div className="text w-1/2 text-center mobile:w-full">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ducimus sunt ea molestiae provident. Est ea nisi officia nostrum excepturi.</div>
            <div className="content flex w-full justify-evenly mobile:flex-col mobile:gap-10">
            {
                features.map((feature, index) => {
                    return (
                        <div className="card w-72 shadow-xl mobile:w-full" key={index}>
                            <figure><img src={feature.img} alt="Image" /></figure>
                            <div className="card-body p-6">
                                <h2 className="card-title">{feature.title}</h2>
                                <p>{feature.text}</p>
                                <div className="card-actions justify-end mt-4">
                                    <a href="/services" className="link link-hover">
                                        Read more{">"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}