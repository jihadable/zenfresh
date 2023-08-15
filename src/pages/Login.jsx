import logo from "../assets/logo.png"
import googleIcon from "../assets/google_icon.png"

export default function Login(){

    document.title = "ZenFresh | Login"

    return (
        <sction className="login flex justify-center items-center w-full h-[100vh] bg-cover mobile:bg-center mobile:px-4">
            <form action="" className="flex flex-col gap-4 p-8 rounded-2xl bg-[rgb(0,0,0,.3)] border-2 border-[rgb(0,0,0,.3)] shadow-2xl mobile:p-6 mobile:w-full">
                <div className="header flex flex-col gap-4 items-center">
                    <div className="logo flex items-center gap-2 text-xl font-bold">
                        <img src={logo} alt="Logo" className="w-16" />
                        <span>ZenFresh</span>
                    </div>
                    <div className="text-4xl">Login</div>
                </div>
                <div className="content flex flex-col gap-4">
                    <div className="email">
                        <input type="email" placeholder="Email address" className="w-[300px] p-3 border-l-4 outline-none rounded-lg border-l-greenCustome mobile:w-full" />
                    </div>
                    <div className="pass">
                        <input type="password" placeholder="Password" className="w-full p-3 border-l-4 outline-none rounded-lg border-l-greenCustome" />
                    </div>
                    <a href="" className="link link-hover self-end text-lightBlue">Forget password?</a>
                    <button type="submit" className="btn bg-greenCustome border-none hover:bg-greenCustome shadow-2xl">
                        <span>Login</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                            <path d="M20 12h-13l3 -3m0 6l-3 -3"></path>
                        </svg>    
                    </button>
                    <button className="login-with-google btn flex items-center p-2 bg-white justify-center gap-4 rounded-lg cursor-pointer">
                        <img src={googleIcon} alt="Google Icon" className="w-8" />
                        <span>Login with Google</span>
                    </button>
                    <div className="not-yet self-center text-lightBlue">
                        Don't have an account? <a href="/signup" className="link link-hover">Sign up</a>
                    </div>
                </div>
            </form>
        </sction>
    )
}