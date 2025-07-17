import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getWSClient } from "../utils/graphqlws";
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

    useEffect(() => {
        const token = localStorage.getItem("token")
        const wsClient = getWSClient({
            "Authorization": `Bearer ${token}`
        })

        const unsubscribeCreated = wsClient.subscribe(
            {
                query: `
                    subscription {
                        order_created {
                            id, status, total_price, date, 
                            category { id, name, price, description }
                            user { id, name, email, phone, address }
                        }
                    }
                `
            },
            {
                next: ({ data }) => {
                    if (data?.order_created){
                        setLaundries(laundries => [data.order_created, ...laundries])
                    }
                }
            }
        )

        const unsubscribeUpdated = wsClient.subscribe(
            {
                query: `
                    subscription {
                        order_updated {
                            id, status, total_price, date, 
                            category { id, name, price, description }
                            user { id, name, email, phone, address }
                        }
                    }
                `
            },
            {
                next: ({ data }) => {
                    if (data?.order_updated){
                        setLaundries(prev => prev.map(item =>
                            item.id === data.order_updated.id ? data.order_updated : item
                        ))
                    }
                }
            }
        )

        return () => {
            unsubscribeCreated()
            unsubscribeUpdated()
        }
    }, [])
    
    return (
        <LaundryContext.Provider value={{ laundries, setLaundries }}>
            {children}
        </LaundryContext.Provider>
    )
}