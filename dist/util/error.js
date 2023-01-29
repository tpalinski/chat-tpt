"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailExistsError = exports.UserInsertionError = void 0;
/**
 * Error thrown while performing checks concerning database insertion
 */
class UserInsertionError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserInsertionError";
    }
}
exports.UserInsertionError = UserInsertionError;
class EmailExistsError extends Error {
    constructor() {
        super("Email already in use");
    }
}
exports.EmailExistsError = EmailExistsError;
