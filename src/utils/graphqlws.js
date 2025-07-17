import { createClient } from 'graphql-ws';

export const getWSClient = headers => {
    return createClient({
        url: import.meta.env.VITE_GRAPHQL_WS_ENDPOINT,
        connectionParams: () => headers
    })
}