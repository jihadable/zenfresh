import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const [login, setLogin] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const auth = async() => {

            const jwt = localStorage.getItem("jwt")
    
            if (!jwt){
                setLogin(false)
                setIsAdmin(null)
                setUser(null)
    
                return
            }
    
            try {
                const usersAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
    
                const { data } = await axios.post(usersAPIEndpoint, 
                    {
                        query:
                        `query {
                            user { id, name, email, phone, address, role, is_email_verified }
                        }`
                    },
                    {
                        headers: {
                            "Authorization" : `Bearer ${jwt}`
                        }
                    }
                )
    
                setLogin(true)
                setIsAdmin(data.data.user.role === "admin")
                setUser(data.data.user)
            } catch (error){
                localStorage.removeItem("jwt")
    
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