import express, { NextFunction, Request, Response } from "express";
import { checkIfExists, insertUser } from "../db";
import { isValidForSignup } from "../util/user";
import { router } from "./router";


export const userRouter = express();


const userParser = (req: Request, res: Response, next: NextFunction) => {
    if(req.body == undefined || !req.body.hasOwnProperty("user")) {
        res.status(400).send("No user object posted")
    }
    let user = req.body.user;
    //@ts-expect-error - attaching user parameter to the request
    req.user = user;
    next();
}

userRouter.use(userParser);

const signupCheck = (req: Request, res: Response, next: NextFunction) => {
    ///@ts-expect-error - user parameter attached in userParser
    let user = req.user;
    user = isValidForSignup(user);
    if(!user) {
        res.status(400).send("Invalid user object")
    }
    checkIfExists(user as User).then((userExists) => {
        if(!userExists){
            next();
        } else {
            res.status(418).send("User already exists")
        }
    })
}

userRouter.post('/signup', signupCheck, async (req: Request, res: Response) => {
    // @ts-expect-error - user parameter attached in userParser
    let user = req.user;
    let result = await insertUser(user as User);
    res.status(201).send("User successfully signed up")
})
