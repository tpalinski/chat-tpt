"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
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
