import express, { Express} from 'express';
import dotenv from 'dotenv'
import { router } from './router/router';
import http from "http";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import session from "express-session";
import { Server } from "socket.io";
import { connectToDatabase, insertUser} from './db';
import { Message, RoomParams, User } from './types/types';
import MongoStore = require('connect-mongo');

dotenv.config()

const bodyParser = require('body-parser');
const app: Express = express();
const port = process.env.PORT || 3001;
connectToDatabase();

const logger = morgan('dev');
app.use(logger);

let corsOptions: CorsOptions = {
  origin: ['https://tpalinski.github.io', 'http://localhost:3000'],
  optionsSuccessStatus: 201,
  credentials: true
}
app.use(cors(corsOptions));
app.use(bodyParser.json())

const password = process.env.MONGO_PASSWORD;
const uri = "mongodb+srv://admin:" + password + "@cluster0.ipgs6c8.mongodb.net/?retryWrites=true&w=majority";

app.use(session({
  secret: process.env.SESSION_KEY as string,
  saveUninitialized: true,
  resave: true,
  store: MongoStore.create({mongoUrl: uri})
}))

const server = http.createServer(app);

// websocket setup
const io: Server = require('socket.io')(server, {
    cors: {
      origin: ['https://tpalinski.github.io/', 'http://localhost:3000'],
      methods: ["GET", "POST"]
    }
  });

// websocket logic
io.on('connection', (socket) => {

    socket.on("join-room", (params: RoomParams, callback) => {
      socket.join(params.room)
      callback({
        status: "ok"
      })
    });

    socket.on("send-message", (message: Message) => {
      let room = [...socket.rooms][1]; // The name of the first and only room that the user joins
      io.to(room).emit("message", message)
    })
})


app.use(router);



server.listen(port, () => {
    console.log(`App running on port: ${port}`)
});