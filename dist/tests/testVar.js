"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonUser = exports.invalidUser = exports.validUser = exports.baseURL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3001;
exports.baseURL = `http://localhost:${port}`;
exports.validUser = {
    email: "testingUser@test.com",
    nickname: "Hejur",
    password: "qwerty123"
};
exports.invalidUser = {
    email: "dgasgads",
    nickname: "",
    password: ""
};
exports.nonUser = {
    email: "tfahfadhfa",
    nickname: "hafdhfads",
    password: "qwerty123"
};
