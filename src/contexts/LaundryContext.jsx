import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const LaundryContext = createContext()

export default function LaundryProvider({ children }){
    const { login } = useContext(AuthContext)
    const [laundries, setLaundries] = useState(null)

    useEffect(() => {
        const getAllLaundries = async() => {
            if (!login){
                return
            }

            try {
                const laundriesAPIEndpoint = import.meta.env.VITE_LAUNDRIES_API_ENDPOINT
                const token = localStorage.getItem("token")

                const { data } = await axios.get(laundriesAPIEndpoint, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                setLaundries(data.laundries)
            } catch(error){
                console.log(error)
            }
        }

        getAllLaundries()
    }, [login])
    
    return (
        <LaundryContext.Provider value={{ laundries, setLaundries }}>
            {children}
        </LaundryContext.Provider>
    )
}