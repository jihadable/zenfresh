import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [login, setLogin] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [user, setUser] = useState({})
    const [laundries, setLaundries] = useState(null)

    const auth = async() => {
        try {
            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT

            const { data: response } = await axios.get(usersAPIEndpoint, {
                headers: {
                    "Authorization" : "Bearer " + token
                }
            })

            setLogin(true)
            setIsAdmin(response.user.role === "admin")
            setUser(response.user)
            setLaundries(response.laundries)
            
            console.log(response)
        } catch (error){
            setLogin(false)
            setIsAdmin(false)
            setUser({})
            setLaundries(null)

            const response = error.response.data

            console.log(response)
        }         
    }

    useEffect(() => {
        auth()
    }, [token])

    return (
        <AuthContext.Provider value={{ auth, token, setToken, login, setLogin, isAdmin, setIsAdmin, user, setUser, laundries, setLaundries }}>
            { children }
            <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored" />
        </AuthContext.Provider>
    )
}