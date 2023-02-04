import { Request } from "express"

type RoomParams = {username: string, room: string}
type Message = {author: string, content: string}

type User = {
    email: string,
    nickname: string,
    password: string,
    friends?: UserInfo[]
}

type UserInfo = {
    email: string,
    nickname: string
}

declare namespace Express {
    interface Session {
        user?: User
    }
}