import dotenv from "dotenv";
import request from "supertest"

dotenv.config();

const port = process.env.PORT || 3001;

const baseURL = `http://localhost:${port}`

describe("GET /", () => {
    test("Should return status: 404", async () => {
        const response = await request(baseURL).get("/")
        expect(response.status).toBe(404);
    })
})

describe("POST /user/signup", () => {
    test("Should return status 400 with no user attached", async () => {
        const response = await request(baseURL)
            .post("/user/signup")
            .send({})
        expect(response.status).toBe(400);
    })
    test("Should return status 201 with valid user", async () => {
        const response = await request(baseURL)
            .post("/user/signup")
            .send({})
        expect(response.status).toBe(400);
    })
});