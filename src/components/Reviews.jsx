import { IconQuote } from "@tabler/icons-react"
import client1 from "../assets/client1.jpg"
import client2 from "../assets/client2.jpg"

export default function Reviews(){

    const reviewsData = [
        {
            name: "Sarah Watson",
            place: "Sleman",
            text: "I've been a ZenFresh customer for over a year now, and I've never been disappointed. Their service is incredibly convenient, especially for someone with a busy schedule like mine. My clothes always come back in perfect condition, and the fresh scent is amazing. I couldn't ask for more from a laundry service.",
            img: client1
        },
        {
            name: "John Doe",
            place: "Yogyakarta",
            text: "I recently tried ZenFresh after several recommendations from friends. The results have been outstanding! The pickup and delivery service is highly efficient, and my clothes come back cleaner and fresher than when I wash them myself. I'm thrilled to have discovered ZenFresh.",
            img: client2
        }
    ]

    return (
        <section className="reviews w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:flex-col mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title font-bold text-3xl text-center">Reviews</div>
            <div className="reviews-items flex gap-4 mobile:flex-col">
            {
                reviewsData.map((item, index) => {
                    return (
                        <div className="item rounded-xl bg-white shadow-2xl p-4 flex flex-col gap-4" key={index}>
                            <div className="text text-black/[.7]">{item.text}</div>
                            <div className="info flex justify-between items-center">
                                <div className="img-name flex items-center gap-4">
                                    <img src={item.img} alt="Image" className="w-16 rounded-full h-fit" />
                                    <div className="name-place flex flex-col">
                                        <div className="name font-bold">{item.name}</div>
                                        <div className="place text-black/[.7]">{item.place}</div>
                                    </div>
                                </div>
                                <IconQuote width={36} height={36} className="text-boldPurple" />
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}