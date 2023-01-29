import dotenv from "dotenv";
import request from "supertest"
import { deleteUser, insertUser } from "../db";

dotenv.config();

const port = process.env.PORT || 3001;

const baseURL = `http://localhost:${port}`

const validUser: User = {
    email: "testingUser@test.com",
    nickname: "Hejur",
    password: "qwerty123"
}

const invalidUser: User = {
    email: "dgasgads",
    nickname: "",
    password: ""
}

const nonUser: User = {
    email: "tfahfadhfa",
    nickname: "hafdhfads",
    password: "qwerty123"
}

describe("GET /", () => {
    test("Should return status: 404", async () => {
        const response = await request(baseURL).get("/")
        expect(response.status).toBe(404);
    })
})

describe("POST /user/signup", () => {

    beforeAll(async () => {
        await deleteUser(validUser)
    })

    test("Should return status 400 with no user attached", async () => {
        const response = await request(baseURL)
            .post("/user/signup")
            .send({})
        expect(response.status).toBe(400);
    })

    test("Should return status 201 with valid user", async () => {
        const response = await request(baseURL)
            .post("/user/signup")
            .send(validUser)
        expect(response.status).toBe(201);
    })

    test("Should return status 418 with user who is already in the database", async () => {
        const response = await request(baseURL)
            .post("/user/signup")
            .send(validUser)
        expect(response.status).toBe(418);
    })

    test("Should return status 400 with invalid user object", async () => {
        const response = await request(baseURL)
            .post("/user/signup")
            .send(invalidUser)
        expect(response.status).toBe(400);
    })
});

describe("GET /user", () => {

    test("Should return status 400 with no user attached", async () => {
        const response = await request(baseURL)
            .get("/user")
            .send({})
        expect(response.status).toBe(400);
    })

    test("Should return status 404 with user who is not in the database", async () => {
        const response = await request(baseURL)
            .get("/user")
            .send(nonUser)
        expect(response.status).toBe(404);
    })

    test("Should return status 200 with user who is in the database", async () => {
        const response = await request(baseURL)
            .get("/user")
            .send(validUser)
        expect(response.status).toBe(200);
    })

    test("Should return information about the user", async () => {
        const response = await request(baseURL)
            .get("/user")
            .send(validUser)
        expect(response.body).toEqual({
            email: validUser.email,
            nickname: validUser.nickname,
        })
    })
})