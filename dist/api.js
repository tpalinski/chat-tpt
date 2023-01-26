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
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const server = http_1.default.createServer(app);
const logger = (0, morgan_1.default)('dev');
app.use(logger);
app.use((0, cors_1.default)());
// websocket setup
const io = new socket_io_1.Server(server);
app.use((req, res, next) => {
    //@ts-ignore
    req.io = io; // forward ws connection
    next();
});
io.on('connection', (ws) => {
    console.log("Connected to websocket");
});
app.use(router_1.router);
server.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
