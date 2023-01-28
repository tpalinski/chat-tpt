/**
 * Error thrown while performing checks concerning database insertion
 */
export class UserInsertionError extends Error {
    constructor(message: string){
        super(message);
        this.name = "UserInsertionError"
    }
}