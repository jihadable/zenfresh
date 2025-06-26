import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./contexts/AuthContext";
import LaundryProvider from "./contexts/LaundryContext";
import About from "./pages/About";
import Account from "./pages/Account";
import DetailLaundry from "./pages/DetailLaundry";
import EditLaundry from "./pages/EditLaundry";
import History from "./pages/History";
import Home from "./pages/Home";
import Laundries from "./pages/Laundries";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import Register from "./pages/Register";
import Services from "./pages/Services";

export default function Router(){

    return (
        <BrowserRouter>
            <AuthProvider>
            <LaundryProvider>
                <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="colored" />
                <Routes>
                    <Route path="/" exact element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/services" element={<Services />}></Route>
                    <Route path="/order" element={<Order />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/account" element={<Account />}></Route>
                    <Route path="/laundries" element={<Laundries />}></Route>
                    <Route path="/detail/:id" element={<DetailLaundry />}></Route>
                    <Route path="/edit/:id" element={<EditLaundry />}></Route>
                    <Route path="/history" element={<History />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </LaundryProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}