import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [login, setLogin] = useState(null)
    const [user, setUser] = useState({})
    const [laundries, setLaundries] = useState([])

    useEffect(() => {
        const auth = async() => {
            
        }

        auth()
    }, [token])

    return (
        <AuthContext.Provider value={{ token, setToken, login, setLogin, user, setUser, laundries, setLaundries }}>
            { children }
        </AuthContext.Provider>
    )
}