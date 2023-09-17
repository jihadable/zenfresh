import { IconChevronLeft } from "@tabler/icons-react"
import { IconHome } from "@tabler/icons-react"

export default function LoginSignup({ page }){

    document.title = "ZenFresh | " + page

    return (
        <div className="login-signup w-full h-[100vh] flex flex-col gap-4 items-center justify-center">
            <form action="" className="w-[40vw] flex flex-col items-center gap-4 bg-white/[.3] backdrop-blur-md p-4 rounded-md">
                {
                    page === "Signup" &&
                    <div className="full-name w-full">
                        <input type="text" className="w-full p-4 border-none outline-none rounded-md" placeholder="Full name" />
                    </div>
                }
                <div className="email w-full">
                    <input type="text" className="w-full p-4 border-none outline-none rounded-md" placeholder="Email address" />
                </div>
                <div className="password w-full">
                    <input type="password" className="w-full p-4 border-none outline-none rounded-md" placeholder="Password" />
                </div>
                <button className="px-4 py-2 rounded-md text-white bg-boldPurple w-fit">
                    {page === "Login" ? "Login" : "Signup"}
                </button>
                <div className="extra">
                    Don't have an account yet? <a href={page === "Login" ? "/signup" : "/login"} className="text-white link-hover">{page === "Login" ? "Signup" : "Login"}</a>
                </div>
            </form>
            <a href="/" className="flex gap-2 items-center link-hover text-white">
                <IconChevronLeft stroke={1.5} />
                <IconHome stroke={1.5} className="text-black" />
                <span>Home</span>
            </a>
        </div>
    )
}