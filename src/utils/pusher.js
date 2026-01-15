import Pusher from "pusher-js"

const jwt = localStorage.getItem("jwt")
export const pusher = new Pusher("8df6d4d768d779f1f8b3", {
    cluster: "ap1",
    authEndpoint: import.meta.env.VITE_PUSHER_AUTH_ENDPOINT,
    auth: {
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    }
})