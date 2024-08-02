import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const [login, setLogin] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const auth = async() => {

            const token = localStorage.getItem("token")
    
            if (!token){
                setLogin(false)
                setIsAdmin(null)
                setUser(null)
    
                return
            }
    
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
            } catch (error){
                localStorage.removeItem("token")
    
                setLogin(false)
                setIsAdmin(false)
                setUser(null)
            }         
        }

        auth()
    }, [])

    return (
        <AuthContext.Provider value={{ login, setLogin, isAdmin, setIsAdmin, user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}