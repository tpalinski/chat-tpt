"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const user_1 = require("../util/user");
exports.userRouter = (0, express_1.default)();
const userParser = (req, res, next) => {
    if (!req.body.hasOwnProperty("email")) {
        return res.status(400).send("No user object posted");
    }
    console.log(req.body);
    let user = req.body;
    //@ts-expect-error - attaching user parameter to the request
    req.user = user;
    next();
};
exports.userRouter.use(userParser);
const signupCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    ///@ts-expect-error - user parameter attached in userParser
    let user = req.user;
    user = (0, user_1.isValidForSignup)(user);
    if (!user) {
        return res.status(400).send("Invalid user object");
    }
    let userExists = yield (0, db_1.getUser)(user);
    if (!userExists) {
        next();
    }
    else {
        return res.status(418).send("User already exists");
    }
});
exports.userRouter.post('/signup', signupCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error - user parameter attached in userParser
    let user = req.user;
    let result = yield (0, db_1.insertUser)(user);
    res.status(201).send("User successfully signed up");
}));
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-expect-error - user parameter attached in userParser
    let user = yield (0, db_1.getUser)(req.user);
    if (user) {
        res.status(200).send(user);
    }
    else {
        return res.status(404).send("No such user found");
    }
}));
