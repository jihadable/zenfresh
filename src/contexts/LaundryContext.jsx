import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const LaundryContext = createContext()

export default function LaundryProvider({ children }){
    const [laundries, setLaundries] = useState(null)

    useEffect(() => {
        const getAllLaundries = async() => {
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
    }, [])
    
    return (
        <LaundryContext.Provider value={{ laundries, setLaundries }}>
            {children}
        </LaundryContext.Provider>
    )
}