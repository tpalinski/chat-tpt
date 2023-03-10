
/** Checks whether the object attached to the request is a well formed User object
 * If valid, returns the object as User
 * 
 * @param user 
 * Object attached to the request
 */

import { User } from "../types/types";

export const isValidForSignup = (user: Object): User | null =>{
    if (user.hasOwnProperty("email") && 
        user.hasOwnProperty("nickname") &&
        user.hasOwnProperty("password")) {
        let userObject = user as User;
        if(userObject.email === "" ||
            userObject.nickname === "" ||
            userObject.password === "") {
            return null;
        } else {
           return userObject; 
        }
    } else {
        return null;
    }
}

export const isValidForLogin = (user: Object): User | null => {
    if (user.hasOwnProperty("email") && user.hasOwnProperty("password")) {
        let userObject = user as User;
        return userObject.email === "" ? null : userObject;
    } else {
        return null;
    }
}