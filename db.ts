import { MongoClient, ServerApiVersion} from 'mongodb'
import bcrypt from "bcrypt";
import { UserInsertionError } from './error';
require('dotenv').config();
const password = process.env.MONGO_PASSWORD;
const uri = "mongodb+srv://admin:" + password + "@cluster0.ipgs6c8.mongodb.net/?retryWrites=true&w=majority";
//@ts-expect-error - useNewUrlParser not detected as a property on MongoClientOptions
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/**
 * Checks whether a connection to the database can be established
 * and closes the server if such connection cannot be made
 */

export function connectToDatabase(){
    client.connect()
    .then(() => {
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

/** Attempts to insert a User object into the database
 * 
 * @param user 
 * A User object which is to be inserted into the database
 * @throws {UserInsertionError}
 */

export async function insertUser(user: User = testUser) {
  const db = client.db('chat-tpt')
  const collection = db.collection('users')
  let canInsert = await checkIfExists(user);
  if(!canInsert){
    throw new UserInsertionError("User already exists!")
  }
  user = await hashPassword(user);
  const insertResult = await collection.insertOne(user);
  console.log(insertResult)
  return insertResult
}


/** Returns a User object with a hashed password
 * @param {User} user
 * User object with its password in raw text form
 * @returns {Promise<User>}
 * 
 * */ 

async function hashPassword(user: User): Promise<User> {
  let password: string = user.password
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(password, salt);
  return user;
}

/** Checks if user with such email exists in the database
 * 
 * @param user 
 * User object to be checked
 * 
 */
async function checkIfExists(user: User): Promise<boolean> {
  const db = client.db('chat-tpt')
  const collection = db.collection('users')
  const query = {email: user.email}
  const findResult = await collection.find(query).toArray();
  console.log('Found documents =>', findResult);
  return !findResult.length
}


