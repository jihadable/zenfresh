import { IconQuote } from "@tabler/icons-react"
import axios from "axios"
import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

export default function Reviews(){
    return (
        <>
        <Navbar />
        <Hero page={"Reviews"} path={"/reviews"} />
        <ReviewsSection />
        <Footer />
        </>
    )
}

function ReviewsSection(){

    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        const getAllReviews = async() => {
            try {
                const reviewsAPIEndpoint = import.meta.env.VITE_REVIEWS_API_ENDPOINT

                const { data } = await axios.get(reviewsAPIEndpoint)

                setReviews(data.reviews)
                console.log(data)
            } catch(error){
                console.log(error)
            }
        }

        getAllReviews()
    }, [])

    return (
        <section className="reviews-section w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:flex-col mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Reviews</div>
        {
            reviews === null ?
            <span className="loading loading-spinner loading-lg bg-boldPurple"></span> :
            <ReviewsContainer reviews={reviews} />
        }
        </section>
    )
}

function ReviewsContainer({ reviews }){
    return (
        <div className="reviews-container w-full flex gap-4 mobile:flex-col">
        {
            reviews.length === 0 &&
            <span className="mt-4 text-center text-xl font-bold">Tidak ada review</span>
        }
        {
            reviews.length <= 2 &&
            <>
            {
                reviews.map((review, index) => (
                    <div className="review-item rounded-xl bg-white shadow-2xl p-4 flex flex-col gap-4 w-full h-fit" key={index}>
                        <div className="text text-black/[.7]">{review.content}</div>
                        <div className="info flex justify-between items-center">
                            <div className="img-name flex items-center gap-4">
                                <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${review.user.fullname}`} alt="Image" className="w-10 rounded-full h-fit" />
                                <div className="name-place flex flex-col">
                                    <div className="name font-bold">{review.user.fullname}</div>
                                    <div className="place text-black/[.7]">{review.user.address}</div>
                                </div>
                            </div>
                            <IconQuote className="text-boldPurple" />
                        </div>
                    </div>
                ))
            }
            </>
        }
        {
            reviews.length >= 3 &&
            <>
            <div className="left flex flex-col gap-4 w-full">
            {
                reviews.filter((_, index) => index % 3 === 0).map((review, index) => (
                    <div className="review-item rounded-xl bg-white shadow-2xl p-4 flex flex-col gap-4 w-full h-fit" key={index}>
                        <div className="text text-black/[.7]">{review.content}</div>
                        <div className="info flex justify-between items-center">
                            <div className="img-name flex items-center gap-4">
                                <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${review.user.fullname}`} alt="Image" className="w-10 rounded-full h-fit" />
                                <div className="name-place flex flex-col">
                                    <div className="name font-bold">{review.user.fullname}</div>
                                    <div className="place text-black/[.7]">{review.user.address}</div>
                                </div>
                            </div>
                            <IconQuote className="text-boldPurple" />
                        </div>
                    </div>
                ))
            }
            </div>
            <div className="mid flex flex-col gap-4 w-full">
            {
                reviews.filter((_, index) => index % 3 === 1).map((review, index) => (
                    <div className="review-item rounded-xl bg-white shadow-2xl p-4 flex flex-col gap-4 w-full h-fit" key={index}>
                        <div className="text text-black/[.7]">{review.content}</div>
                        <div className="info flex justify-between items-center">
                            <div className="img-name flex items-center gap-4">
                                <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${review.user.fullname}`} alt="Image" className="w-10 rounded-full h-fit" />
                                <div className="name-place flex flex-col">
                                    <div className="name font-bold">{review.user.fullname}</div>
                                    <div className="place text-black/[.7]">{review.user.address}</div>
                                </div>
                            </div>
                            <IconQuote className="text-boldPurple" />
                        </div>
                    </div>
                ))
            } 
            </div>
            <div className="right flex flex-col gap-4 w-full">
            {
                reviews.filter((_, index) => index % 3 === 2).map((review, index) => (
                    <div className="review-item rounded-xl bg-white shadow-2xl p-4 flex flex-col gap-4 w-full h-fit" key={index}>
                        <div className="text text-black/[.7]">{review.content}</div>
                        <div className="info flex justify-between items-center">
                            <div className="img-name flex items-center gap-4">
                                <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${review.user.fullname}`} alt="Image" className="w-10 rounded-full h-fit" />
                                <div className="name-place flex flex-col">
                                    <div className="name font-bold">{review.user.fullname}</div>
                                    <div className="place text-black/[.7]">{review.user.address}</div>
                                </div>
                            </div>
                            <IconQuote className="text-boldPurple" />
                        </div>
                    </div>
                ))
            }
            </div>
            </>
        }
        </div>
    )
}