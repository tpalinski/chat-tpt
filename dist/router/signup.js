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
const bcrypt_1 = __importDefault(require("bcrypt"));
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
/** Check if user is eligible for signup
 * @param req.user
 * User object attached to the request
 *
 * @returns
 */
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
// Routing
exports.userRouter.get("/me", (req, res) => {
    //@ts-expect-error
    if (req.session.user) {
        //@ts-expect-error
        res.status(200).send(req.session.user);
    }
    else {
        res.status(401).send("Client not logged in");
    }
});
exports.userRouter.use(userParser);
exports.userRouter.post('/signup', signupCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error - user parameter attached in userParser
    let user = req.user;
    let result = yield (0, db_1.insertUser)(user);
    res.status(201).send("User successfully signed up");
}));
exports.userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error - user parameter attached in userParser
    let user = (0, user_1.isValidForLogin)(req.user);
    if (!user) {
        return res.status(400).send("Invalid user request");
    }
    let dbUser = yield (0, db_1.getUser)(user);
    if (!dbUser) {
        return res.status(404).send("This user does not exist");
    }
    if (yield bcrypt_1.default.compare(user.password, dbUser.password)) {
        ///@ts-expect-error
        req.session.user = {
            email: dbUser.email,
            nickname: dbUser.nickname
        };
        res.status(200).send("Successfully logged in");
    }
    else {
        res.status(400).send("Wrong credentials");
    }
}));
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-expect-error - user parameter attached in userParser
    let user = yield (0, db_1.getUser)(req.user);
    if (user) {
        let response = {
            email: user.email,
            nickname: user.nickname,
        };
        res.status(200).send(response);
    }
    else {
        return res.status(404).send("No such user found");
    }
}));
