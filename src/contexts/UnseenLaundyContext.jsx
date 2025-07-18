import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { pusher } from "../utils/pusher";
import { AuthContext } from "./AuthContext";

export const UnseenLaundryContext = createContext()

export default function UnseenLaundryProvider({ children }){
    const { login, user } = useContext(AuthContext)
    const [unseenLaundries, setUnseenLaundries] = useState(0)

    useEffect(() => {
        const getUnseenLaundries = async() => {
            try {
                const token = localStorage.getItem("token")
                const graphqlEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT

                const { data } = await axios.post(graphqlEndpoint, 
                    {
                        query:
                        `query {
                            unseen_orders
                        }`
                    },
                    {
                        headers: {
                            "Authorization" : "Bearer " + token
                        }
                    }
                )

                setUnseenLaundries(data.data.unseen_orders)
            } catch(error){
                console.log(error)
            }
        }

        getUnseenLaundries()
    }, [login, user])

    useEffect(() => {
        const channel = pusher.subscribe("order_channel")
        channel.bind("unseen_orders", data => {
            setUnseenLaundries(data)
        })

        return () => {
            pusher.unsubscribe("order_channel")
        }
    }, [])
    
    return (
        <UnseenLaundryContext.Provider value={{ unseenLaundries, setUnseenLaundries }}>
            {children}
        </UnseenLaundryContext.Provider>
    )
}