import { MongoClient, ServerApiVersion } from 'mongodb'
require('dotenv').config();
const password = process.env.MONGO_PASSWORD;
const uri = "mongodb+srv://admin:" + password + "@cluster0.ipgs6c8.mongodb.net/?retryWrites=true&w=majority";
//@ts-ignore
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export async function connectToDatabase(){
    client.connect().then((res) => {
      console.log("Connected to database ")
    })
    
}
