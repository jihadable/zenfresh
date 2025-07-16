import { createClient } from 'graphql-ws';

export const wsClient = createClient({
    url: import.meta.env.VITE_GRAPHQL_WS_ENDPOINT
})