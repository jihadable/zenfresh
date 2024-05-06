import { IconChevronLeft, IconHome } from "@tabler/icons-react";
import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import goTop from "./goTop";

export default function Login(){

    const [emailInput, passwordInput] = [useRef(null), useRef(null)]

    const handleLogin = async(e) => {
        e.preventDefault()

        try {
            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT
    
            const { data: response } = await axios.post(`${usersAPIEndpoint}/login`, {
                email: emailInput.current.value,
                password: passwordInput.current.value
            })
    
            console.log(response)
        } catch (error){
            const response = error.response.data

            console.log(response)
        }
    }

    const [isLabelEmailInputOpen, setIsLabelEmailInputOpen] = useState(false)
    const [isLabelPasswordInputOpen, setIsLabelPasswordInputOpen] = useState(false)

    const handleFieldBlur = (field) => {
        if (field === "email"){
            if (emailInput.current.value === ""){
                setIsLabelEmailInputOpen(false)
            }
        }
        if (field === "password"){
            if (passwordInput.current.value === ""){
                setIsLabelPasswordInputOpen(false)
            }
        }
    }

    const formFieldStyle = "w-full p-4 pt-5 pb-3 relative bg-white rounded-md"
    const fieldLabelStyle = "absolute transition-all left-4 text-gray-400 cursor-text"
    const fieldInputStyle = "w-full border-none outline-none"

    return (
        <div className="login w-full h-[100vh] flex flex-col gap-4 items-center justify-center mobile:px-4">
            <form className="w-[40vw] flex flex-col items-center gap-4 bg-white/[.3] backdrop-blur-md p-4 rounded-md mobile:w-full tablet:w-[50vw]" onSubmit={handleLogin}>
                <div className={`email ${formFieldStyle}`}>
                    <label htmlFor="email-input" className={`${fieldLabelStyle} ${isLabelEmailInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Email</label>
                    <input type="text" id="email-input" className={fieldInputStyle} required onFocus={() => setIsLabelEmailInputOpen(true)} onBlur={() => handleFieldBlur("email")} ref={emailInput} />
                </div>
                <div className={`password ${formFieldStyle}`}>
                    <label htmlFor="password-input" className={`${fieldLabelStyle} ${isLabelPasswordInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Password</label>
                    <input type="text" id="password-input" className={fieldInputStyle} required onFocus={() => setIsLabelPasswordInputOpen(true)} onBlur={() => handleFieldBlur("password")} ref={passwordInput} />
                </div>
                <button type="submit" className="px-4 py-2 rounded-md text-white bg-boldPurple w-fit">
                    Login
                </button>
                <div className="extra">
                    Belum punya akun? <Link to={"/signup"} className="text-white link-hover">Register</Link>
                </div>
            </form>
            <Link to="/" onClick={goTop} className="flex gap-2 items-center link-hover text-black">
                <IconChevronLeft stroke={1.5} width={20} height={20} />
                <IconHome stroke={1.5} />
                <span>Home</span>
            </Link>
        </div>
    )
}