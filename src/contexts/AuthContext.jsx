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
                const usersAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
    
                const { data } = await axios.post(usersAPIEndpoint, 
                    {
                        query:
                        `query {
                            user { id, name, email, phone, address, role }
                        }`
                    },
                    {
                        headers: {
                            "Authorization" : "Bearer " + token
                        }
                    }
                )
    
                setLogin(true)
                setIsAdmin(data.data.user.role === "admin")
                setUser(data.data.user)
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