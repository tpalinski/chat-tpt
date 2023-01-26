import express, { Express} from 'express';
import dotenv from 'dotenv'
import { router } from './router/router';
import http from "http";
import morgan from "morgan";
import cors from "cors";
import { Server } from "socket.io";

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 3001;


const logger = morgan('dev');

app.use(logger);
app.use(cors());

const server = http.createServer(app);

// websocket setup
const io: Server = require('socket.io')(server, {
    cors: {
      origin: '*',
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

    socket.on("send-message", (message: string) => {
      let room = [...socket.rooms][1]; // The name of the first and only room that the user joins
      io.to(room).emit("message", message)
    })
})


app.use(router);



server.listen(port, () => {
    console.log(`App running on port: ${port}`)
});