"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = (0, express_1.default)();
exports.router.all("/", (req, res) => {
    res.status(404).send("Should be using WebSockets for this");
});
