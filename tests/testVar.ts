import dotenv from "dotenv";
import { User } from "../types/types";

dotenv.config();

const port = process.env.PORT || 3001;

export const baseURL = `http://localhost:${port}`

export const validUser: User = {
    email: "testingUser@test.com",
    nickname: "Hejur",
    password: "qwerty123"
}

export const invalidUser: User = {
    email: "dgasgads",
    nickname: "",
    password: ""
}

export const nonUser: User = {
    email: "tfahfadhfa",
    nickname: "hafdhfads",
    password: "qwerty123"
}