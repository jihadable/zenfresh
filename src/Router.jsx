import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/services" element={<Services />}></Route>
                <Route path="/pricing" element={<Pricing />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                {/* <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route> */}
            </Routes>
        </BrowserRouter>
    )
}