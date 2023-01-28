"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://admin:Klopklop2@cluster0.ipgs6c8.mongodb.net/?retryWrites=true&w=majority";
//@ts-ignore
const client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb_1.ServerApiVersion.v1 });
function connectToDatabase() {
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        console.log("Connected to the database");
        client.close();
    });
}
exports.connectToDatabase = connectToDatabase;
