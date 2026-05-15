import express from "express"
import http from 'http';
import {Server} from 'socket.io'
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import pollRouter from './routes/polls.routes.js'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true // 
  }
});

// Make io accessible in your routes
app.set('socketio', io);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

io.on('connection', (socket) => {
  console.log('A user connected via Socket.io');
});

app.use("/api/v1/users", userRouter)
app.use("api/v1/polls", pollRouter)

export { app , server}
