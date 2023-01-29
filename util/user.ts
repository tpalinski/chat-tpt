
/** Checks whether the object attached to the request is a well formed User object
 * If valid, returns the object as User
 * 
 * @param user 
 * Object attached to the request
 */

export const isValidForSignup = (user: Object): User | null =>{
    if (user.hasOwnProperty("email") && 
        user.hasOwnProperty("nickname") &&
        user.hasOwnProperty("password")) {
        return user as User;
    } else {
        return null;
    }
}