import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import About from "./pages/About";
import Account from "./pages/Account";
import EditLaundry from "./pages/EditLaundry";
import History from "./pages/History";
import Home from "./pages/Home";
import Laundries from "./pages/Laundries";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import Register from "./pages/Register";
import Review from "./pages/Review";
import Services from "./pages/Services";

export default function Router(){

    // useEffect(() => {
    //     const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    //     const clientKey = import.meta.env.VITE_CLIENT_KEY

    //     const script = document.createElement("script")

    //     script.src = snapScript
    //     script.setAttribute("data-client-key", clientKey)
    //     script.async = true

    //     document.body.appendChild(script)

    //     return () => {
    //         document.body.removeChild(script)
    //     }
    // }, [])

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" exact element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/services" element={<Services />}></Route>
                    <Route path="/order" element={<Order />}></Route>
                    <Route path="/review" element={<Review />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/account" element={<Account />}></Route>
                    <Route path="/laundries" element={<Laundries />}></Route>
                    <Route path="/edit/:id" element={<EditLaundry />}></Route>
                    <Route path="/history" element={<History />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}