import Pusher from "pusher-js"

const jwt = localStorage.getItem("jwt")
export const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    authEndpoint: import.meta.env.VITE_PUSHER_AUTH_ENDPOINT,
    auth: {
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    }
})