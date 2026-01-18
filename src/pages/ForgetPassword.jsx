import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ForgetPassword(){
    return (
        <>
        <Navbar />
        <ForgetPasswordSection />
        <Footer />
        </>
    )
}

function ForgetPasswordSection(){
    const emailInput = useRef(null)
        
    const [isLabelEmailInputOpen, setIsLabelEmailInputOpen] = useState(false)

    const handleFieldBlur = (field) => {
        if (field === "email"){
            if (emailInput.current.value === ""){
                setIsLabelEmailInputOpen(false)
            }
        }
    }

    const formFieldStyle = "w-full p-4 pt-5 pb-3 relative bg-white rounded-md"
    const fieldLabelStyle = "absolute transition-all left-4 text-gray-400 cursor-text"
    const fieldInputStyle = "w-full border-none outline-none"

    const [isLoading, setIsLoading] = useState(false)

    const handleSendPasswordResetEmail = async(event) => {
        event.preventDefault()

        try {
            setIsLoading(true)

            const email = emailInput.current.value
            const graphqlEndpoint = import.meta.VITE_GRAPHQL_ENDPOINT

            const { data } = await axios.post(graphqlEndpoint, {
                query:
                `mutation {
                    send_password_reset_email(email: "${email}"){ id }
                }`
            })

            if (data.errors){
                const { message } = data.errors[0]
                throw new Error(message)
            }

            toast.success("Password reset email sent")
            setIsLoading(false)
        } catch(error){
            setIsLoading(false)
            console.log(error)
        }
    }
    
    return (
        <section className="w-[80vw] py-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <form action="" onSubmit={handleSendPasswordResetEmail} className="flex flex-col gap-4 w-1/2 items-center">
                <div className="text-xl font-bold text-center">Password Reset</div>
                <p className="text-center">Forgotten your password? Enter your email address below, and we'll send you an email allowing you to reset it.</p>
                <div className={`email ${formFieldStyle}`}>
                    <label htmlFor="email-input" className={`${fieldLabelStyle} ${isLabelEmailInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Email</label>
                    <input type="email" id="email-input" className={fieldInputStyle} required onFocus={() => setIsLabelEmailInputOpen(true)} onBlur={() => handleFieldBlur("email")} ref={emailInput} />
                </div>
            {
                isLoading ?
                <div className="flex items-center justify-center w-32 py-2 rounded-md text-white bg-boldPurple">
                    <span className="loading loading-spinner loading-md"></span>
                </div> :
                <button type="submit" className="py-2 w-32 text-white rounded-md bg-boldPurple">Submit</button>
            }
            </form>
        </section>
    )
}