"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router/router");
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
(0, db_1.connectToDatabase)();
(0, db_1.insertUser)()
    .then((res) => {
    console.log(res);
})
    .catch(console.error);
const logger = (0, morgan_1.default)('dev');
app.use(logger);
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
// websocket setup
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
// websocket logic
io.on('connection', (socket) => {
    socket.on("join-room", (params, callback) => {
        socket.join(params.room);
        callback({
            status: "ok"
        });
    });
    socket.on("send-message", (message) => {
        let room = [...socket.rooms][1]; // The name of the first and only room that the user joins
        io.to(room).emit("message", message);
    });
});
app.use(router_1.router);
server.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
