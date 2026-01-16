import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { pusher } from "../utils/pusher";
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
                const jwt = localStorage.getItem("jwt")

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
                            "Authorization": "Bearer " + jwt
                        }
                    }
                )

                if (data.errors){
                    const { message } = data.errors[0]
                    throw new Error(message)
                }

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

    useEffect(() => {
        const channel = pusher.subscribe("order_channel")
        channel.bind("order_created", data => {
            setLaundries(laundries => [data, ...laundries])
        })
        channel.bind("order_updated", data => {
            setLaundries(laundries => laundries.map(l => l.id === data.id ? data : l))
        })

        return () => {
            pusher.unsubscribe("order_channel")
        }
    }, [])
    
    return (
        <LaundryContext.Provider value={{ laundries, setLaundries }}>
            {children}
        </LaundryContext.Provider>
    )
}