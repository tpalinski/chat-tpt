import express, { NextFunction, Request, Response } from "express";
import { getUser, hashPassword, insertUser } from "../db";
import { isValidForLogin, isValidForSignup } from "../util/user";
import bcrypt from "bcrypt";


export const userRouter = express();


const userParser = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.hasOwnProperty("email")) {
        return res.status(400).send("No user object posted")
    }
    console.log(req.body)
    let user = req.body;
    //@ts-expect-error - attaching user parameter to the request
    req.user = user;
    next();
}



/** Check if user is eligible for signup
 * @param req.user
 * User object attached to the request
 *
 * @returns 
 */
const signupCheck = async (req: Request, res: Response, next: NextFunction) => {
    ///@ts-expect-error - user parameter attached in userParser
    let user = req.user;
    user = isValidForSignup(user);
    if(!user) {
        return res.status(400).send("Invalid user object")
    }
    let userExists = await getUser(user as User)
    if(!userExists){
        next();
    } else {
        return res.status(418).send("User already exists")
    }
}


// Routing

userRouter.use(userParser);


userRouter.post('/signup', signupCheck, async (req: Request, res: Response) => {
    // @ts-expect-error - user parameter attached in userParser
    let user = req.user;
    let result = await insertUser(user as User);
    res.status(201).send("User successfully signed up")
})

userRouter.post('/login', async (req: Request, res: Response) => {
    // @ts-expect-error - user parameter attached in userParser
    let user = isValidForLogin(req.user);
    if(!user){
        return res.status(400).send("Invalid user request")
    }
    let dbUser = await getUser(user);
    if(!dbUser){
        return res.status(404).send("This user does not exist")
    }
    if(await bcrypt.compare(user.password, dbUser.password)) {
        res.status(200).send("Successfully logged in")
    } else {
        res.status(400).send("Wrong credentials")
    }
})

userRouter.get("/", async (req: Request, res: Response) => {
    //@ts-expect-error - user parameter attached in userParser
    let user = await getUser(req.user);
    if(user){
        let response = {
            email: user.email,
            nickname: user.nickname,
        }
        res.status(200).send(response)
    } else {
        return res.status(404).send("No such user found")
    }
})
