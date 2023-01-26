"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = (0, express_1.default)();
exports.router.all("/", (req, res, next) => {
    res.redirect(301, "/api");
});
exports.router.use("/api", (req, res) => {
    res.status(200).send("Refer to the documentation for all the endpoints");
});
