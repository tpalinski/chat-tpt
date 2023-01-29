/**
 * Error thrown while performing checks concerning database insertion
 */
export class UserInsertionError extends Error {
    constructor(message: string){
        super(message);
        this.name = "UserInsertionError"
    }
}

export class EmailExistsError extends Error {
    constructor() {
        super("Email already in use");
    }
}