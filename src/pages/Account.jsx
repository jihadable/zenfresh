import { IconEdit } from "@tabler/icons-react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

export default function Account(){

    document.title = "ZenFresh | Akun"

    const { login } = useContext(AuthContext)

    if (login === false){
        return <Navigate replace to={"/"} />
    }

    return (
        <>
        <Navbar />
        <Hero page={"Akun"} path={"/account"} />
        <MyAccount />
        <Footer />
        </>
    )
}

function MyAccount(){

    const { isAdmin, user } = useContext(AuthContext)

    return (
        <section className="my-account w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Akun Saya</div>
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
                    <div className="item">
                        <div className="field text-sm">Alamat</div>
                        <div className="value bg-white p-2 rounded-md shadow-lg">{user.address || "-"}</div>
                    </div>
                    <div className="item">
                        <div className="field text-sm">No HP</div>
                        <div className="value bg-white p-2 rounded-md shadow-lg">{user.address || "-"}</div>
                    </div>
                {
                    isAdmin === false &&
                    <button type="button" className="bg-boldPurple flex items-center gap-2 justify-center mt-2 p-2 text-white rounded-md">
                        <IconEdit stroke={1.5} />
                        <span>Edit profile</span>
                    </button>
                }
                </div>
            </div>
        </section>
    )
}