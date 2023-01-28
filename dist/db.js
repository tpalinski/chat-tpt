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
exports.insertUser = exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
const password = process.env.MONGO_PASSWORD;
const uri = "mongodb+srv://admin:" + password + "@cluster0.ipgs6c8.mongodb.net/?retryWrites=true&w=majority";
//@ts-ignore
const client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb_1.ServerApiVersion.v1 });
function connectToDatabase() {
    client.connect()
        .then((client) => {
        console.log("Database connection works");
    })
        .catch((error) => {
        console.log(error);
        process.exit();
    });
}
exports.connectToDatabase = connectToDatabase;
const testUser = {
    email: 'test@tes.com',
    nickname: 'Testowy Gosciu',
    password: 'Fajne',
};
function insertUser(user = testUser) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const db = client.db('chat-tpt');
        const collection = db.collection('users');
        user = yield hashPassword(user);
        const insertResult = yield collection.insertOne(user);
        console.log(insertResult);
    });
}
exports.insertUser = insertUser;
/// Hash user's password using bcrypt
function hashPassword(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let password = user.password;
        const salt = yield bcrypt_1.default.genSalt();
        user.password = yield bcrypt_1.default.hash(password, salt);
        return user;
    });
}
