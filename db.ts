import { MongoClient, ServerApiVersion} from 'mongodb'
import bcrypt from "bcrypt";
import {  EmailExistsError} from './util/error';
import { User } from './types/types';
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

  user = await hashPassword(user);

  const insertResult = await collection.insertOne(user);
  return insertResult
}


/** Returns a User object with a hashed password
 * @param {User} user
 * User object with its password in raw text form
 * @returns {Promise<User>}
 * 
 * */ 

export async function hashPassword(user: User): Promise<User> {
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
 * @returns
 * User if user exists, 
 * null if no user was found
 */
export async function getUser(user: User): Promise<User | null> {
  const db = client.db('chat-tpt')
  const collection = db.collection('users')
  const query = {email: user.email}
  const findResult: unknown = await collection.findOne(query)
  if(findResult) {
    return findResult as User
  } else {
    return null
  }
}


/** Deletes user from the database
 * 
 * @param user 
 * User to be deleted
 */
export async function deleteUser(user: User) {
  const db = client.db('chat-tpt')
  const collection = db.collection('users')
  const query = {email: user.email}
  const findResult = await collection.find(query).toArray();
  findResult.forEach((user) => collection.deleteOne({_id: user._id}));
}




