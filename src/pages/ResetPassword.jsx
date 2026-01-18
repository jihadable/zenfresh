import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NotFound from "./NotFound";

export default function ResetPassword(){
    const { token } = useParams()

    if (!token){
        return <NotFound />
    }
    
    return (
        <>
        <Navbar />
        <ResetPasswordSection token={token} />
        <Footer />
        </>
    )
}

function ResetPasswordSection({ token }){
    const [newPasswordInput, newPasswordConfirmationInput] = [useRef(null), useRef(null)]
            
    const [isLabelNewPasswordInputOpen, setIsLabelNewPasswordInputOpen] = useState(false)
    const [isLabelNewPasswordConfirmationInputOpen, setIsLabelNewPasswordConfirmationInputOpen] = useState(false)

    const handleFieldBlur = (field) => {
        if (field === "new-password"){
            if (newPasswordInput.current.value === ""){
                setIsLabelNewPasswordInputOpen(false)
            }
        } else if (field === "new-password-confirmarion"){
            if (newPasswordConfirmationInput.current.value === ""){
                setIsLabelNewPasswordConfirmationInputOpen(false)
            }
        }
    }

    const formFieldStyle = "w-full p-4 pt-5 pb-3 relative bg-white rounded-md"
    const fieldLabelStyle = "absolute transition-all left-4 text-gray-400 cursor-text"
    const fieldInputStyle = "w-full border-none outline-none"

    const [isLoading, setIsLoading] = useState(false)

    const handleUpdatePassword = async(event) => {
        event.preventDefault()

        const newPassword = newPasswordInput.current.value
        const newPasswordConfirmation = newPasswordConfirmationInput.current.value

        if (newPassword != newPasswordConfirmation){
            toast.warn("Password confirmarion doesn't match")

            return
        }

        try {
            setIsLoading(true)

            const graphqlEndpoint = import.meta.VITE_GRAPHQL_ENDPOINT

            const { data } = await axios.post(graphqlEndpoint, {
                query:
                `mutation {
                    reset_password(token: "${token}", new_password: "${newPassword}"){ id }
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
            <form action="" onSubmit={handleUpdatePassword} className="flex flex-col gap-4 w-1/2 items-center">
                <div className="text-xl font-bold text-center">Change password</div>
                <div className={formFieldStyle}>
                    <label htmlFor="new-password-input" className={`${fieldLabelStyle} ${isLabelEmailInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>New password</label>
                    <input type="password" id="new-password-input" className={fieldInputStyle} required onFocus={() => setIsLabelNewPasswordInputOpen(true)} onBlur={() => handleFieldBlur("new-password")} ref={newPasswordInput} />
                </div>
                <div className={formFieldStyle}>
                    <label htmlFor="new-password-confirmarion-input" className={`${fieldLabelStyle} ${isLabelEmailInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>New password (again)</label>
                    <input type="password" id="new-password-confirmarion-input" className={fieldInputStyle} required onFocus={() => setIsLabelNewPasswordConfirmationInputOpen(true)} onBlur={() => handleFieldBlur("new-password-confirmarion")} ref={newPasswordConfirmationInput} />
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