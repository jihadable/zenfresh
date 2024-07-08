import { IconChevronLeft, IconHome } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import goTop from "../utils/goTop";

export default function Register(){
    document.title = "ZenFresh | Register"
    
    const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState(false)
    const { setLogin, setUser, setIsAdmin } = useContext(AuthContext)

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
            toast.error("No HP yang Anda masukkan tidak valid")

            return
        }
        if (password.length < 8){
            toast.error("Password harus melebihi 8 karakter")

            return
        }
        
        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT
            
            const { data } = await axios.post(`${usersAPIEndpoint}/register`, {
                fullname, email, password, phone, address, role: "customer"
            })
            
            localStorage.setItem("token", data.token)
            setLogin(true)
            setUser(data.user)
            setIsAdmin(data.user.role === "admin")
            
            setIsLoading(false)
            
            navigate("/")
        } catch (error){
            const { message } = error.response.data
            toast.error(message)

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

    return (
        <div className="register w-full h-[100vh] flex flex-col gap-4 items-center justify-center mobile:px-4">
            <form className="w-[40vw] flex flex-col items-center gap-4 bg-white/[.3] backdrop-blur-md p-4 rounded-md mobile:w-full tablet:w-[50vw]" onSubmit={handleRegister}>
                <div className={`full-name ${formFieldStyle}`}>
                    <label htmlFor="fullname-input" className={`${fieldLabelStyle} ${isLabelFullnameInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Nama lengkap</label>
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
                    <label htmlFor="phone-input" className={`${fieldLabelStyle} ${isLabelPhoneInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>No HP</label>
                    <input type="text" id="phone-input" className={fieldInputStyle} required onFocus={() => setIsLabelPhoneInputOpen(true)} onBlur={() => handleFieldBlur("phone")} ref={phoneInput} />
                </div>
                <div className={`address ${formFieldStyle}`}>
                    <label htmlFor="address-input" className={`${fieldLabelStyle} ${isLabelAddressInputOpen ? "top-0 left-2 text-sm" : 'top-4'}`}>Alamat</label>
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
                    Sudah punya akun? <Link to={"/login"} className="text-white link-hover">Login</Link>
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