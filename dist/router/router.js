"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const signup_1 = require("./signup");
exports.router = (0, express_1.default)();
exports.router.use("/user", signup_1.userRouter);
exports.router.get("/", (req, res) => {
    res.status(404).send();
});
