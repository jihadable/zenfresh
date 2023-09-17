import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Order from "./pages/Order";
import LoginSignup from "./pages/Login-Signup";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/services" element={<Services />}></Route>
                <Route path="/order" element={<Order />}></Route>
                <Route path="/login" element={<LoginSignup page={"Login"} />}></Route>
                <Route path="/signup" element={<LoginSignup page={"Signup"} />}></Route>
            </Routes>
        </BrowserRouter>
    )
}