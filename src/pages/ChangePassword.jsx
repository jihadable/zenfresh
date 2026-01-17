import axios from "axios"
import { useContext, useRef, useState } from "react"
import { toast } from "react-toastify"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"

export default function ChangePassword(){
    const { login } = useContext(AuthContext)
        
    return (
        <>
        <Navbar />
        <ChangePasswordSection />
        <Footer />
        </>
    )
    // if (login === false){
    //     return <NotFound />
    // }
    // if (login === true){
    //     document.title = "ZenFresh | Change Password"

    // }
    // return null
}

function ChangePasswordSection(){
    const [oldPasswordInput, newPasswordInput, newPasswordConfirmationInput] = [
        useRef(null), useRef(null), useRef(null)
    ]
        
    const [isLabelOldPasswordInputOpen, setIsLabelOldPasswordInputOpen] = useState(false)
    const [isLabelNewPasswordInputOpen, setIsLabelNewPasswordInputOpen] = useState(false)
    const [isLabelNewPasswordConfirmationInputOpen, setIsLabelNewPasswordConfirmationInputOpen] = useState(false)

    const handleFieldBlur = (field) => {
        if (field === "old-password"){
            if (oldPasswordInput.current.value === ""){
                setIsLabelOldPasswordInputOpen(false)
            }
        } else if (field === "new-password"){
            if (newPasswordInput.current.value === ""){
                setIsLabelNewPasswordInputOpen(false)
            }
        } else if (field === "new-password-confirmation"){
            if (newPasswordConfirmationInput.current.value === ""){
                setIsLabelNewPasswordConfirmationInputOpen(false)
            }
        }
    }

    const formFieldStyle = "w-full p-4 pt-5 pb-3 relative bg-white rounded-md"
    const fieldLabelStyle = "absolute transition-all left-4 text-gray-400 cursor-text"
    const fieldInputStyle = "w-full border-none outline-none"

    const [isLoading, setIsLoading] = useState(false)

    const handleChangePassword = async(event) => {
        event.preventDefault()

        const oldPassword = oldPasswordInput.current.value
        const newPassword = newPasswordInput.current.value
        const newPasswordConfirmation = newPasswordConfirmationInput.current.value

        if (newPassword != newPasswordConfirmation){
            toast.warn("New password confirmation unmatched")

            return
        }

        if (oldPassword == newPassword){
            toast.warn("New password can not be same with old password")

            return
        }
        
        try {
            setIsLoading(true)

            const jwt = localStorage.getItem("jwt")
            const graphqlEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT

            const { data } = await axios.post(graphqlEndpoint,
                {
                    query:
                    `mutation {
                        update_user_password(password: "${oldPassword}", new_password: "${newPassword}"){ id }
                    }`
                },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            )

            if (data.errors){
                const { message } = data.errors[0]
                throw new Error(message)
            }

            setIsLoading(false)
        } catch(error){
            setIsLoading(false)
            console.log(error)
        }
    }
    
    return (
        <section>
            <form action="" onSubmit={handleChangePassword}>
                <div className={formFieldStyle}>
                    <label htmlFor="old-password-input" className={`${fieldLabelStyle} ${isLabelOldPasswordInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Old Password</label>
                    <input type="password" id="old-password-input" className={fieldInputStyle} required onFocus={() => setIsLabelOldPasswordInputOpen(true)} onBlur={() => handleFieldBlur("old-password")} ref={oldPasswordInput} />
                </div>
                <div className={formFieldStyle}>
                    <label htmlFor="new-password-input" className={`${fieldLabelStyle} ${isLabelNewPasswordInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>New Password</label>
                    <input type="password" id="new-password-input" className={fieldInputStyle} required onFocus={() => setIsLabelNewPasswordInputOpen(true)} onBlur={() => handleFieldBlur("new-password")} ref={newPasswordInput} />
                </div>
                <div className={formFieldStyle}>
                    <label htmlFor="new-password-confirmation-input" className={`${fieldLabelStyle} ${isLabelNewPasswordConfirmationInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>New Password (again)</label>
                    <input type="password" id="new-password-confirmation-input" className={fieldInputStyle} required onFocus={() => setIsLabelNewPasswordConfirmationInputOpen(true)} onBlur={() => handleFieldBlur("new-password-confirmation")} ref={newPasswordConfirmationInput} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}