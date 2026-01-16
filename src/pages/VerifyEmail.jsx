import { IconArrowLeft, IconArrowRight, IconCheck, IconX } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import logo from "../assets/logo.png"
import { AuthContext } from "../contexts/AuthContext"
import NotFound from "./NotFound"

export default function VerifyEmail(){
    const { token } = useParams()
    const [status, setStatus] = useState("loading")
    const { setUser } = useContext(AuthContext)

    if (!token){
        return <NotFound />
    }

    useEffect(() => {
        const handleVerifyEmail = async() => {
            try {
                const graphqlEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
                const { data } = await axios.post(graphqlEndpoint, {
                    query:
                    `mutation {
                        verify_email(token: "${token}"){
                            id, name, email, phone, address, role, is_email_verified
                        }
                    }`  
                })

                if (data.errors){
                    const { message } = data.errors[0]
                    throw new Error(message)
                }

                setUser(data.data.verify_email)
                setStatus("success")
            } catch(error){
                setStatus("error")
                console.log(error)
            }
        }

        handleVerifyEmail()
    }, [token])
    
    if (status == "loading"){
        return (
            <section className="flex flex-col h-screen w-screen items-center justify-center">
                <span className="loading loading-spinner loading-md text-boldPurple"></span>
            </section>
        )
    }
    if (status == "error"){
        return (
            <section className="flex flex-col h-screen w-screen items-center justify-center">
                <div className="text-xl font-bold text-center">ZenFresh</div>
                <img src={logo} alt="ZenFresh Logo" className="w-12" />
                <div className="flex items-center mt-4 gap-1 text-center"><p>Verification failed</p> <IconX className="text-red-500" /></div>
                <p className="text-center">This verification link is invalid or has expired.</p>
                <Link to={"/"} className="mt-2 rounded-md bg-boldPurple p-2 text-white flex items-center gap-2">
                    <IconArrowLeft stroke={1.5} />
                    <span>Back to home</span>
                </Link>
            </section>
        )
    }
    if (status == "success"){
        return (
            <section className="flex flex-col h-screen w-screen items-center justify-center">
                <div className="text-xl font-bold text-center">ZenFresh</div>
                <img src={logo} alt="ZenFresh Logo" className="w-12" />
                <div className="flex items-center mt-4 gap-1 text-center"><p>Email verified</p> <IconCheck className="text-green-500" /></div>
                <p className="text-center">Your email address has been successfully verified.</p>
                <Link to={"/login"} className="mt-2 rounded-md bg-boldPurple p-2 text-white flex items-center gap-2">
                    <span>Login page</span>
                    <IconArrowRight stroke={1.5} />
                </Link>
            </section>
        )
    }
}