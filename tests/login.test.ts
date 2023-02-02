import { baseURL, validUser, nonUser } from "./testVar";
import request from "supertest";


describe("POST /user/login", () => {

    test("Should return status 400 with no user attached", async () => {
        const response = await request(baseURL)
            .post("/user/login")
            .send({})
        expect(response.status).toBe(400);
    })

    test("Should return status 200 with good credentials", async () => {
        const response = await request(baseURL)
            .post("/user/login")
            .send({
                email: validUser.email,
                password: validUser.password
            })
        expect(response.status).toBe(200);
    })

    test("Should return status 404 with non-existent user", async () => {
        const response = await request(baseURL)
            .post("/user/login")
            .send(nonUser)
        expect(response.status).toBe(404);
    })

    test("Should return status 400 with wrong credentials", async () => {
        const response = await request(baseURL)
            .post("/user/login")
            .send({
                email: validUser.email,
                password: "clearlywrongpassword"
            })
        expect(response.status).toBe(400);
    })

    test("Should return status 400 with invalid user object", async () => {
        const response = await request(baseURL)
            .post("/user/login")
            .send({
                password: "password"
            })
        expect(response.status).toBe(400);
    })

})