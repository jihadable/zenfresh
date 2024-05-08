import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import About from "./pages/About";
import Account from "./pages/Account";
import EditLaundry from "./pages/EditLaundry";
import History from "./pages/History";
import Home from "./pages/Home";
import Laundries from "./pages/Laundries";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Register from "./pages/Register";
import Services from "./pages/Services";

export default function Router(){
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" exact element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/services" element={<Services />}></Route>
                    <Route path="/order" element={<Order />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/account" element={<Account />}></Route>
                    <Route path="/laundries" element={<Laundries />}></Route>
                    <Route path="/edit/:id" element={<EditLaundry />}></Route>
                    <Route path="/history" element={<History />}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}