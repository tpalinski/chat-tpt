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
exports.deleteUser = exports.getUser = exports.insertUser = exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
const password = process.env.MONGO_PASSWORD;
const uri = "mongodb+srv://admin:" + password + "@cluster0.ipgs6c8.mongodb.net/?retryWrites=true&w=majority";
//@ts-expect-error - useNewUrlParser not detected as a property on MongoClientOptions
const client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb_1.ServerApiVersion.v1 });
/**
 * Checks whether a connection to the database can be established
 * and closes the server if such connection cannot be made
 */
function connectToDatabase() {
    client.connect()
        .then(() => {
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
/** Attempts to insert a User object into the database
 *
 * @param user
 * A User object which is to be inserted into the database
 * @throws {UserInsertionError}
 */
function insertUser(user = testUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = client.db('chat-tpt');
        const collection = db.collection('users');
        user = yield hashPassword(user);
        const insertResult = yield collection.insertOne(user);
        return insertResult;
    });
}
exports.insertUser = insertUser;
/** Returns a User object with a hashed password
 * @param {User} user
 * User object with its password in raw text form
 * @returns {Promise<User>}
 *
 * */
function hashPassword(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let password = user.password;
        const salt = yield bcrypt_1.default.genSalt();
        user.password = yield bcrypt_1.default.hash(password, salt);
        return user;
    });
}
/** Checks if user with such email exists in the database
 *
 * @param user
 * User object to be checked
 *
 * @returns
 * User if user exists,
 * null if no user was found
 */
function getUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = client.db('chat-tpt');
        const collection = db.collection('users');
        const query = { email: user.email };
        const findResult = yield collection.findOne(query);
        if (findResult) {
            return findResult;
        }
        else {
            return null;
        }
    });
}
exports.getUser = getUser;
/** Deletes user from the database
 *
 * @param user
 * User to be deleted
 */
function deleteUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = client.db('chat-tpt');
        const collection = db.collection('users');
        const query = { email: user.email };
        const findResult = yield collection.find(query).toArray();
        findResult.forEach((user) => collection.deleteOne({ _id: user._id }));
    });
}
exports.deleteUser = deleteUser;
