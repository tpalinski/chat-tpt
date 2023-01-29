"use strict";
/** Checks whether the object attached to the request is a well formed User object
 * If valid, returns the object as User
 *
 * @param user
 * Object attached to the request
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidForSignup = void 0;
const isValidForSignup = (user) => {
    if (user.hasOwnProperty("email") &&
        user.hasOwnProperty("nickname") &&
        user.hasOwnProperty("password")) {
        let userObject = user;
        if (userObject.email === "" ||
            userObject.nickname === "" ||
            userObject.password === "") {
            return null;
        }
        else {
            return userObject;
        }
    }
    else {
        return null;
    }
};
exports.isValidForSignup = isValidForSignup;
