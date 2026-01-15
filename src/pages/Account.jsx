import { IconEdit } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

export default function Account(){

    const { login } = useContext(AuthContext)
    
    if (login === false){
        return <NotFound />
    }
    if (login === true){
        document.title = "ZenFresh | Account"

        return (
            <>
            <Navbar />
            <Hero page={"Account"} path={"/account"} />
            <MyAccount />
            <Footer />
            </>
        )
    }
    return null
}

function MyAccount(){

    const { isAdmin, user } = useContext(AuthContext)

    const [editTime, setEditTime] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const handleSendEmailVerification = async() => {
        try {
            setIsLoading(true)
            const jwt = localStorage.getItem("jwt")
            const graphqlEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT

            await axios.post(graphqlEndpoint,
                {
                    query:
                    `mutation {
                        send_email_verification { id }
                    }`
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )

            toast.success("Email verification sent")
            setIsLoading(false)
        } catch(error){
            setIsLoading(false)
            console.log(error)
        }
    } 

    return (
        <section className="my-account w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">My account</div>
            {
                user === null &&
                <span className="loading loading-spinner loading-lg bg-boldPurple"></span>
            }
            {
                user && 
                <div className="profile flex gap-4 w-full mobile:w-full mobile:flex-col mobile:items-center">
                    <div className="img-profile">
                        <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}&name=${isAdmin ? "_a" : user.name}`} alt="Image" className="w-48 rounded-full" />
                    </div>
                    <div className="profile-items w-full flex flex-col gap-4 mobile:w-full">
                    {
                        editTime &&
                        <EditForm setEditTime={setEditTime} user={user} />
                    }
                    {
                        !editTime &&
                        <>
                        <div className="item">
                            <div className="field text-sm">Name</div>
                            <div className="value bg-white p-2 rounded-md shadow-lg">{user.name || "-"}</div>
                        </div>
                        <div className="item">
                            <div className="field text-sm">Email</div>
                            <div className="value bg-white p-2 rounded-md shadow-lg">{user.email || "-"}</div>
                        {
                            user.is_email_verified === false &&
                            <div className="text-sm mt-1">
                                <p className="text-red-500">Email not verified</p>
                            {
                                isLoading ?
                                <div className="py-1.5 text-white flex justify-center w-48 rounded-md bg-boldPurple">
                                    <span className="loading loading-spinner loading-md"></span>
                                </div> :
                                <button type="button" className="py-2 w-48 rounded-md text-white bg-boldPurple text-sm" onClick={handleSendEmailVerification}>Send email verification</button>
                            }
                            </div>
                        }
                        </div>
                        <div className="item">
                            <div className="field text-sm">Address</div>
                            <div className="value bg-white p-2 rounded-md shadow-lg">{user.address || "-"}</div>
                        </div>
                        <div className="item">
                            <div className="field text-sm">Phone number</div>
                            <div className="value bg-white p-2 rounded-md shadow-lg">{user.phone || "-"}</div>
                        </div>
                        </>
                    }
                    {
                        isAdmin === false && !editTime &&
                        <button type="button" className="bg-boldPurple flex items-center gap-2 justify-center mt-2 p-2 text-white rounded-md" onClick={() => setEditTime(true)}>
                            <IconEdit stroke={1.5} />
                            <span>Edit profile</span>
                        </button>
                    }
                    </div>
                </div>
            }
        </section>
    )
}

function EditForm({ setEditTime, user }){

    const [isLoading, setIsLoading] = useState(false)
    const [nameInput, addressInput, phoneInput] = [useRef(null), useRef(null), useRef(null)]
    const { setUser } = useContext(AuthContext)
    
    const handleSaveEditedData = async() => {
        const phonePattern = /^08\d{8,13}$/
        const [name, phone, address] = [
            nameInput.current.value,
            phoneInput.current.value,
            addressInput.current.value
        ]

        if (name === ""){
            toast.warn("Name can not be empty")

            return
        }
        if (!phonePattern.test(phone) || phone === ""){
            toast.warn("Phone number is invalid")

            return
        }
        if (address === ""){
            toast.warn("Address can not be empty")

            return
        }

        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
            const jwt = localStorage.getItem("jwt")

            await axios.post(usersAPIEndpoint, 
                {
                    query:
                    `mutation {
                        update_user(
                            name: "${name}"
                            phone: "${phone}",
                            address: "${address}"
                        ){
                            id, name, email, phone, address, role    
                        }
                    }`
                },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            )

            setUser(user => ({...user, name, phone, address}))
            toast.success("Update user profile successfully")

            setIsLoading(false)
            setEditTime(false)
        } catch(error){
            toast.error("Update user profile failed")
            setIsLoading(false)
            setEditTime(false)
        }
    }

    return (
        <>
        <div className="item">
            <div className="field text-sm">Name</div>
            <input type="text" autoFocus className="w-full bg-white p-2 rounded-md shadow-lg outline-boldPurple" defaultValue={user.name} required ref={nameInput} />
        </div>
        <div className="item">
            <div className="field text-sm">Email</div>
            <div className="value bg-white p-2 rounded-md shadow-lg">{user.email}</div>
        </div>
        <div className="item">
            <div className="field text-sm">Address</div>
            <input type="text" className="w-full bg-white p-2 rounded-md shadow-lg outline-boldPurple" defaultValue={user.address} required ref={addressInput} />
        </div>
        <div className="item">
            <div className="field text-sm">Phone number</div>
            <input type="text" className="w-full bg-white p-2 rounded-md shadow-lg outline-boldPurple" defaultValue={user.phone} required ref={phoneInput} />
        </div>
        <div className="btns flex gap-2 mt-2">
            <button type="button" className="w-full bg-red-600 p-2 text-white rounded-md" onClick={() => setEditTime(false)}>Cancel</button>
            {
                isLoading ?
                <div className="w-full flex items-center justify-center p-2 h-full rounded-md text-white bg-green-600 self-end">
                    <span className="loading loading-spinner loading-sm"></span>
                </div> :
                <button type="button" className="w-full flex items-center justify-center bg-green-600 p-2 text-white rounded-md" onClick={handleSaveEditedData}>Save</button>
            }
        </div>
        </>
    )
}