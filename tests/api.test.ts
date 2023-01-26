import dotenv from "dotenv";
import request from "supertest"

dotenv.config();

const port = process.env.PORT || 3001;

const baseURL = `http://localhost:${port}`

describe("GET /", () => {
    test("Should return status: 200", async () => {
        const response = await request(baseURL).get("/")
        expect(response.status).toBe(200);
    })
    test("Should return a message", async () => {
        const response = await request(baseURL).get("/")
        console.log(response);
        expect(response.text).toBeDefined();
    })
})