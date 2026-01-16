import { IconChevronLeft, IconHome } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import goTop from "../utils/goTop";
import NotFound from "./NotFound";

export default function Register(){
    
    const navigate = useNavigate()
    
    const { login, setLogin, setUser } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async(e) => {
        e.preventDefault()

        const phonePattern = /^08\d{8,13}$/
        const [
            fullname, email, password, phone, address
        ] = [
            fullnameInput.current.value,
            emailInput.current.value,
            passwordInput.current.value,
            phoneInput.current.value,
            addressInput.current.value
        ]

        if (!phonePattern.test(phone)){
            toast.error("Phone number is invalid")

            return
        }
        if (password.length < 8){
            toast.error("Password must be contains 8 or more carachters")

            return
        }
        
        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
            
            const { data } = await axios.post(usersAPIEndpoint, {
                query:
                `mutation {
                    register(
                        name: "${fullname}"
                        email: "${email}"
                        password: "${password}"
                        phone: "${phone}"
                        address: "${address}"
                    ){
                        jwt
                        user { id, name, email, phone, address, role }
                    }
                }`
            })

            if (data.errors){
                const { message } = data.errors[0]
                throw new Error(message)
            }
            
            localStorage.setItem("jwt", data.register.jwt)
            setLogin(true)
            setUser(data.register.user)
            
            navigate("/")
            setIsLoading(false)
        } catch (error){
            toast.error("Register fail")

            setIsLoading(false)
        }
    }

    const [fullnameInput, emailInput, passwordInput, phoneInput, addressInput] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
    
    const [isLabelFullnameInputOpen, setIsLabelFullnameInputOpen] = useState(false)
    const [isLabelEmailInputOpen, setIsLabelEmailInputOpen] = useState(false)
    const [isLabelPasswordInputOpen, setIsLabelPasswordInputOpen] = useState(false)
    const [isLabelPhoneInputOpen, setIsLabelPhoneInputOpen] = useState(false)
    const [isLabelAddressInputOpen, setIsLabelAddressInputOpen] = useState(false)

    const handleFieldBlur = (field) => {
        if (field === "fullname"){
            if (fullnameInput.current.value === ""){
                setIsLabelFullnameInputOpen(false)
            }
        }
        else if (field === "email"){
            if (emailInput.current.value === ""){
                setIsLabelEmailInputOpen(false)
            }
        }
        else if (field === "password"){
            if (passwordInput.current.value === ""){
                setIsLabelPasswordInputOpen(false)
            }
        }
        else if (field === "phone"){
            if (phoneInput.current.value === ""){
                setIsLabelPhoneInputOpen(false)
            }
        }
        else if (field === "address"){
            if (addressInput.current.value === ""){
                setIsLabelAddressInputOpen(false)
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
        document.title = "ZenFresh | Register"

        return (
            <div className="register w-full h-[100vh] flex flex-col gap-4 items-center justify-center mobile:px-4">
                <form className="w-[40vw] flex flex-col items-center gap-4 bg-white/[.3] backdrop-blur-md p-4 rounded-md mobile:w-full tablet:w-[50vw]" onSubmit={handleRegister}>
                    <div className={`full-name ${formFieldStyle}`}>
                        <label htmlFor="fullname-input" className={`${fieldLabelStyle} ${isLabelFullnameInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Name</label>
                        <input type="text" id="fullname-input" className={fieldInputStyle} required onFocus={() => setIsLabelFullnameInputOpen(true)} onBlur={() => handleFieldBlur("fullname")} ref={fullnameInput} />
                    </div>
                    <div className={`email ${formFieldStyle}`}>
                        <label htmlFor="email-input" className={`${fieldLabelStyle} ${isLabelEmailInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Email</label>
                        <input type="email" id="email-input" className={fieldInputStyle} required onFocus={() => setIsLabelEmailInputOpen(true)} onBlur={() => handleFieldBlur("email")} ref={emailInput} />
                    </div>
                    <div className={`password ${formFieldStyle}`}>
                        <label htmlFor="password-input" className={`${fieldLabelStyle} ${isLabelPasswordInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Password</label>
                        <input type="password" id="password-input" className={fieldInputStyle} required onFocus={() => setIsLabelPasswordInputOpen(true)} onBlur={() => handleFieldBlur("password")} ref={passwordInput} />
                    </div>
                    <div className={`phone ${formFieldStyle}`}>
                        <label htmlFor="phone-input" className={`${fieldLabelStyle} ${isLabelPhoneInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Phone</label>
                        <input type="text" id="phone-input" className={fieldInputStyle} required onFocus={() => setIsLabelPhoneInputOpen(true)} onBlur={() => handleFieldBlur("phone")} ref={phoneInput} />
                    </div>
                    <div className={`address ${formFieldStyle}`}>
                        <label htmlFor="address-input" className={`${fieldLabelStyle} ${isLabelAddressInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Address</label>
                        <input type="text" id="address-input" className={fieldInputStyle} required onFocus={() => setIsLabelAddressInputOpen(true)} onBlur={() => handleFieldBlur("address")} ref={addressInput} />
                    </div>
                    {
                        isLoading ?
                        <div className="flex items-center justify-center w-24 py-2 rounded-md text-white bg-boldPurple">
                            <span className="loading loading-spinner loading-md"></span>
                        </div> :
                        <button type="submit" className="w-24 py-2 rounded-md text-white bg-boldPurple">
                            Register
                        </button>
                    }
                    <div className="extra">
                        Already have account? <Link to={"/login"} className="text-white link-hover">Login</Link>
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