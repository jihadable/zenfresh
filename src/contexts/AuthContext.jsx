import { createContext } from "react";

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const user = {}
    const laundries = []

    return (
        <AuthContext.Provider value={{ user, laundries }}>
            { children }
        </AuthContext.Provider>
    )
}