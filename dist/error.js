"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInsertionError = void 0;
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
