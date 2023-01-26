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
const server = http.createServer(app);

const logger = morgan('dev');

app.use(logger);
app.use(cors());

// websocket setup
const io = new Server(server);

app.use((req, res, next) => {
    //@ts-ignore
    req.io = io; // forward ws connection
    next();
})

io.on('connection', (ws) => {
    console.log("Connected to websocket")
})


app.use(router);



server.listen(port, () => {
    console.log(`App running on port: ${port}`)
});