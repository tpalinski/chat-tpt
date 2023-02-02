
import request from "supertest"
import { baseURL, nonUser, validUser } from "./testVar";


describe("GET /", () => {
    test("Should return status: 404", async () => {
        const response = await request(baseURL).get("/")
        expect(response.status).toBe(404);
    })
})


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

