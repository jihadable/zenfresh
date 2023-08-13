import logo from "../assets/logo.png"
import googleIcon from "../assets/google_icon.png"

export default function Signup(){
    return (
        <section className="signup flex justify-center items-center w-full h-[100vh] bg-cover mobile:bg-center mobile:px-4">
            <form action="" className="flex flex-col gap-4 p-8 rounded-2xl bg-[rgb(255,255,255,.1)] border-2 border-[rgb(255,255,255,.3)] shadow-2xl mobile:p-6 mobile:w-full">
                <div className="header flex flex-col gap-4 items-center">
                    <div className="logo flex items-center gap-2 text-xl font-bold">
                        <img src={logo} alt="Logo" className="w-16" />
                        <span>ZenFresh</span>
                    </div>
                    <div className="text-4xl">Sign Up</div>
                </div>
                <div className="content flex flex-col gap-4">
                    <div className="name">
                        <input type="text" placeholder="Full name" className="w-[300px] p-3 border-b-2 outline-none rounded-t-2xl border-b-darkBlue mobile:w-full" />
                    </div>
                    <div className="email">
                        <input type="email" placeholder="Email address" className="w-[300px] p-3 border-b-2 outline-none rounded-t-2xl border-b-darkBlue mobile:w-full" />
                    </div>
                    <div className="pass">
                        <input type="password" placeholder="Password" className="w-full p-3 border-b-2 outline-none rounded-t-2xl border-b-darkBlue" />
                    </div>
                    <button type="submit" className="btn bg-greenCustome border-none hover:bg-greenCustome shadow-2xl">Sign up</button>
                    <button className="login-with-google btn flex items-center p-2 bg-white justify-center gap-4 rounded-lg cursor-pointer">
                        <img src={googleIcon} alt="Google Icon" className="w-8" />
                        <span>Sign up with Google</span>
                    </button>
                    <div className="already self-center">
                        Already have an account? <a href="/signup" className="link link-hover">Login</a>
                    </div>
                </div>
            </form>
        </section>
    )
}