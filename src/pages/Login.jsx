import { IconChevronLeft, IconHome } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import goTop from "../utils/goTop";
import NotFound from "./NotFound";

export default function Login(){

    const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState(false)
    const { login, setLogin, setUser, setIsAdmin } = useContext(AuthContext)

    const handleLogin = async(e) => {
        e.preventDefault()
        
        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
            
            const { data } = await axios.post(usersAPIEndpoint, {
                query:
                `mutation {
                    login(
                        email: "${emailInput.current.value}"
                        password: "${passwordInput.current.value}"
                    ){
                        token
                        user { id, name, email, phone, address, role }
                    }
                }`
            })
            
            navigate("/")
            
            localStorage.setItem("token", data.data.login.token)
            setLogin(true)
            setUser(data.data.login.user)
            setIsAdmin(data.data.login.user.role === "admin")

            setIsLoading(false)
        } catch (error){
            console.log(error)
            toast.error("Login fail")
            setIsLoading(false)
        }
    }

    const [emailInput, passwordInput] = [useRef(null), useRef(null)]
    
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

    if (login === true){
        return <NotFound />
    }

    if (login === false){
        document.title = "ZenFresh | Login"

        return (
            <div className="login w-full h-[100vh] flex flex-col gap-4 items-center justify-center mobile:px-4">
                <form className="w-[40vw] flex flex-col items-center gap-4 bg-white/[.3] backdrop-blur-md p-4 rounded-md mobile:w-full tablet:w-[50vw]" onSubmit={handleLogin}>
                    <div className={`email ${formFieldStyle}`}>
                        <label htmlFor="email-input" className={`${fieldLabelStyle} ${isLabelEmailInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Email</label>
                        <input type="email" id="email-input" className={fieldInputStyle} required onFocus={() => setIsLabelEmailInputOpen(true)} onBlur={() => handleFieldBlur("email")} ref={emailInput} />
                    </div>
                    <div className={`password ${formFieldStyle}`}>
                        <label htmlFor="password-input" className={`${fieldLabelStyle} ${isLabelPasswordInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Password</label>
                        <input type="password" id="password-input" className={fieldInputStyle} required onFocus={() => setIsLabelPasswordInputOpen(true)} onBlur={() => handleFieldBlur("password")} ref={passwordInput} />
                    </div>
                    {
                        isLoading ?
                        <div className="flex items-center justify-center w-20 py-2 rounded-md text-white bg-boldPurple">
                            <span className="loading loading-spinner loading-md"></span>
                        </div> :
                        <button type="submit" className="w-20 py-2 rounded-md text-white bg-boldPurple">
                            Login
                        </button>
                    }
                    <div className="extra">
                        Do not have account yet? <Link to={"/register"} className="text-white link-hover">Register</Link>
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

    return null
}