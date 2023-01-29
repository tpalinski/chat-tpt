type RoomParams = {username: string, room: string}
type User = {
    email: string,
    nickname: string,
    password: string,
    friends?: User[]
}

