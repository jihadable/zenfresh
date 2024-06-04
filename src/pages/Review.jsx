import { IconMailForward } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

export default function Review(){

    const { login } = useContext(AuthContext)

    if (login === false){
        return <NotFound />
    }

    return (
        <>
        <Navbar />
        <Hero page={"Review"} path={"/review"} />
        <ReviewForm />
        <Footer />
        </>
    )
}

function ReviewForm(){

    const [isloading, setIsLoading] = useState(false)
    const reviewContent = useRef(null)

    const navigate = useNavigate()

    const getTodayDate = () => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }

        const today = new Date()

        return today.toLocaleDateString("id-ID", options)
    }

    const { token } = useContext(AuthContext)

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            setIsLoading(true)

            const reviewsAPIEndpoint = import.meta.env.VITE_REVIEWS_API_ENDPOINT
            const content = reviewContent.current.value
            const date = getTodayDate()

            await axios.post(
                reviewsAPIEndpoint, 
                {
                    content, 
                    date                
                },
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            toast.success("Terima kasih atas review Anda")

            setIsLoading(false)

            navigate("/")
        } catch(error){
            console.log(error)
        }
    }

    return (
        <section className="review-form w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:flex-col mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Review</div>
            <form className="w-1/2 flex flex-col gap-2 mobile:w-full" onSubmit={handleSubmit}>
                <textarea rows={10} placeholder="Berikan review Anda" className="resize-none w-full outline-none p-2 rounded-md shadow-2xl border-2 border-white focus:border-boldPurple" ref={reviewContent}></textarea>
            {
                isloading ?
                <div className="py-2 w-24 rounded-md bg-boldPurple text-white flex items-center justify-center self-end">
                    <span className="loading loading-spinner loading-md"></span>
                </div> :
                <button type="submit" className="w-24 py-2 bg-boldPurple flex justify-center items-center gap-1 text-white rounded-md self-end">
                    <IconMailForward stroke={1.5} />
                    <span>Submit</span>
                </button>
            }
            </form>
        </section>
    )
}