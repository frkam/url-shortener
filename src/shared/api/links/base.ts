import { GraphQLClient } from "graphql-request"
import { ENDPOINT, SOCKET_ENDPOINT } from "@/shared/config"

export const graphQLClient = new GraphQLClient(ENDPOINT)

import Echo from "laravel-echo"
const io = require("socket.io-client")

declare global {
  interface Window {
    io: any
  }
}

window.io = io

export const echo = new Echo({
  broadcaster: "socket.io",
  host: SOCKET_ENDPOINT,
  transports: ["websocket"],
})
