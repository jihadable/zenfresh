import { IconHome } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import goTop from "./goTop";

export default function Signup(){
    return (
        <div className="signup w-full h-[100vh] flex flex-col gap-4 items-center justify-center mobile:px-4">
            <form action="" className="w-[40vw] flex flex-col items-center gap-4 bg-white/[.3] backdrop-blur-md p-4 rounded-md mobile:w-full tablet:w-[50vw]">
                <div className="full-name w-full">
                    <input type="text" className="w-full p-4 border-none outline-none rounded-md" placeholder="Full name" />
                </div>
                <div className="email w-full">
                    <input type="text" className="w-full p-4 border-none outline-none rounded-md" placeholder="Email address" />
                </div>
                <div className="password w-full">
                    <input type="password" className="w-full p-4 border-none outline-none rounded-md" placeholder="Password" />
                </div>
                <button className="px-4 py-2 rounded-md text-white bg-boldPurple w-fit">
                    Signup
                </button>
                <div className="extra">
                    Already have an account? <Link to={"/login"} className="text-white link-hover">Login</Link>
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