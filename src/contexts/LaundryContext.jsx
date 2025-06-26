import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const LaundryContext = createContext()

export default function LaundryProvider({ children }){
    const { login, user } = useContext(AuthContext)
    const [laundries, setLaundries] = useState(null)

    useEffect(() => {
        const getAllLaundries = async() => {
            if (!login || !user){
                return
            }

            try {
                const laundriesAPIEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT
                const token = localStorage.getItem("token")

                let query
                if (user.role === "admin"){
                    query = 
                    `query {
                        orders {
                            id, status, total_price, date, 
                            category { id, name, price, description }
                            user { id, name, email, phone, address }
                        }
                    }`
                } else if (user.role === "customer"){
                    query =
                    `query {
                        user_orders {
                            id, status, total_price, date, 
                            category { id, name, price, description }
                            user { id, name, email, phone, address }
                        }
                    }`
                }

                const { data } = await axios.post(laundriesAPIEndpoint, 
                    {
                        query
                    },
                    {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    }
                )

                if (user.role === "admin"){
                    setLaundries(data.data.orders)
                } else if (user.role === "customer"){
                    setLaundries(data.data.user_orders)
                }
            } catch(error){
                console.log(error)
            }
        }

        getAllLaundries()
    }, [login, user])
    
    return (
        <LaundryContext.Provider value={{ laundries, setLaundries }}>
            {children}
        </LaundryContext.Provider>
    )
}