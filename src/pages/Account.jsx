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
        document.title = "ZenFresh | Akun"

        return (
            <>
            <Navbar />
            <Hero page={"Akun"} path={"/account"} />
            <MyAccount />
            <Footer />
            </>
        )
    }
}

function MyAccount(){

    const { isAdmin, user } = useContext(AuthContext)

    const [editTime, setEditTime] = useState(false)

    return (
        <section className="my-account w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Akun Saya</div>
            {
                user === null &&
                <span className="loading loading-spinner loading-lg bg-boldPurple"></span>
            }
            {
                user && 
                <div className="profile flex gap-4 mobile:w-full mobile:flex-col mobile:items-center">
                    <div className="img-profile">
                        <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${isAdmin ? "_a" : user.fullname}`} alt="Image" className="w-48 rounded-full" />
                    </div>
                    <div className="profile-items w-60 flex flex-col gap-4 mobile:w-full">
                        <div className="item flex flex-col">
                            <div className="field text-sm">Nama Lengkap</div>
                            <div className="value bg-white p-2 rounded-md shadow-lg">{user.fullname}</div>
                        </div>
                        <div className="item">
                            <div className="field text-sm">Email</div>
                            <div className="value bg-white p-2 rounded-md shadow-lg">{user.email}</div>
                        </div>
                    {
                        editTime &&
                        <EditForm setEditTime={setEditTime} alamatInitialValue={user.address} noHPInitialValue={user.no_hp} />
                    }
                    {
                        isAdmin === false && !editTime &&
                        <>
                        <div className="item">
                            <div className="field text-sm">Alamat</div>
                            <div className="value bg-white p-2 rounded-md shadow-lg">{user.address || "-"}</div>
                        </div>
                        <div className="item">
                            <div className="field text-sm">No HP</div>
                            <div className="value bg-white p-2 rounded-md shadow-lg">{user.no_hp || "-"}</div>
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

function EditForm({ setEditTime, alamatInitialValue, noHPInitialValue }){

    const [isLoading, setIsLoading] = useState(false)
    const [alamatInput, noHPInput] = [useRef(null), useRef(null)]
    const noHPPattern = /^08\d{8,13}$/
    const { auth, token } = useContext(AuthContext)

    const handleSaveEditedData = async() => {
        if (!noHPPattern.test(noHPInput.current.value)){
            toast.error("No HP yang Anda masukkan tidak valid")

            return
        }

        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT

            await axios.patch(
                usersAPIEndpoint, 
                {
                    address: alamatInput.current.value === "" ? null : alamatInput.current.value,
                    no_hp: noHPInput.current.value === "" ? null : noHPInput.current.value
                }, 
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            auth()
            
            toast.success("Berhasil memperbarui data user")

            setIsLoading(false)
            
            setEditTime(false)
        } catch(error){
            setIsLoading(false)
        }
    }

    return (
        <>
        <div className="item">
            <div className="field text-sm">Alamat</div>
            <input type="text" autoFocus className="w-full bg-white p-2 rounded-md shadow-lg outline-boldPurple" defaultValue={alamatInitialValue} ref={alamatInput} />
        </div>
        <div className="item">
            <div className="field text-sm">No HP</div>
            <input type="text" className="w-full bg-white p-2 rounded-md shadow-lg outline-boldPurple" defaultValue={noHPInitialValue} ref={noHPInput} />
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