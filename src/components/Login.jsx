import { Link } from "react-router-dom";
import goTop from "./goTop";
import { IconChevronLeft } from "@tabler/icons-react";
import { IconHome } from "@tabler/icons-react";

export default function Login(){

    return (
        <div className="login w-full h-[100vh] flex flex-col gap-4 items-center justify-center mobile:px-4">
            <form action="" className="w-[40vw] flex flex-col items-center gap-4 bg-white/[.3] backdrop-blur-md p-4 rounded-md mobile:w-full tablet:w-[50vw]">
                <div className="email w-full">
                    <input type="text" className="w-full p-4 border-none outline-none rounded-md" placeholder="Email address" />
                </div>
                <div className="password w-full">
                    <input type="password" className="w-full p-4 border-none outline-none rounded-md" placeholder="Password" />
                </div>
                <button type="submit" className="px-4 py-2 rounded-md text-white bg-boldPurple w-fit">
                    Login
                </button>
                <div className="extra">
                    Don't have an account yet? <Link to={"/signup"} className="text-white link-hover">Signup</Link>
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