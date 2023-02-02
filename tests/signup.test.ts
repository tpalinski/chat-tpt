import { deleteUser } from "../db";
import { validUser, baseURL, invalidUser } from "./testVar";

import request from "supertest"


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