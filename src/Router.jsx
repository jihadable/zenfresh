import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />}></Route>
                {/* <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route> */}
            </Routes>
        </BrowserRouter>
    )
}