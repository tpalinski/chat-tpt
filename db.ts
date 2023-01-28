import { Collection, MongoClient, ServerApiVersion} from 'mongodb'
import bcrypt from "bcrypt";
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


const testUser: User = {
  email: 'test@tes.com',
  nickname: 'Testowy Gosciu',
  password: 'Fajne',
}

export async function insertUser(user: User = testUser) {
  await client.connect()
  const db = client.db('chat-tpt')
  const collection = db.collection('users')
  user = await hashPassword(user);
  const insertResult = await collection.insertOne(user);
  console.log(insertResult);
}

/// Hash user's password using bcrypt
async function hashPassword(user: User): Promise<User> {
  let password: string = user.password
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(password, salt);
  return user;
}


