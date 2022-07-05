import http from "http"
import express from "express"
import cors from "cors"
import { Server, RedisPresence } from "colyseus"
import { MongooseDriver } from "@colyseus/mongoose-driver"

import { GameRoom } from "./GameRoom"

// Binds each instance of the server on a different port.
const PORT = Number(process.env.PORT) + Number(process.env.NODE_APP_INSTANCE);
// const PORT = Number(process.env.PORT || 2567)

const app = express()

app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const gameServer = new Server({
  server,
  presence: new RedisPresence(),
  driver: new MongooseDriver("mongodb://localhost:27017"),
})

// register your room handlers
gameServer.define("game", GameRoom)

gameServer.listen(PORT)
console.log(`Listening on ws://localhost:${PORT}`)

