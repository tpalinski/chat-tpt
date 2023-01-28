import { Collection, MongoClient, ServerApiVersion} from 'mongodb'
require('dotenv').config();
const password = process.env.MONGO_PASSWORD;
const uri = "mongodb+srv://admin:" + password + "@cluster0.ipgs6c8.mongodb.net/?retryWrites=true&w=majority";
//@ts-ignore
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



export function connectToDatabase(){
    client.connect()
    .then((client) => {
      console.log("Database connection works")
    })
    .catch((error) => {
      console.log(error)
      process.exit();
    })
}




export async function insertUser() {
  await client.connect()
  const db = client.db('chat-tpt')
  const collection = db.collection('users')
  const testUser: User = {
    email: 'test@tes.com',
    nickname: 'Testowy Gosciu',
    password: 'Fajne',
  }
  const insertResult = await collection.insertOne(testUser);
  console.log(insertResult);
}


