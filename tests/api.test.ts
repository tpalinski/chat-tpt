import dotenv from "dotenv";
import request from "supertest"

dotenv.config();

const port = process.env.PORT || 3001;

const baseURL = `http://localhost:${port}`

describe("GET /", () => {
    test("Should return status: 301", async () => {
        const response = await request(baseURL).get("/")
        expect(response.status).toBe(301);
    })
    test("Should redirect to /api", async () => {
        const response = await request(baseURL).get("/")
        expect(response.redirect).toBe(true)
    })
})

describe("GET /api", () => {
    test("Should return status: 200", async () => {
        const response = await request(baseURL).get("/api")
        expect(response.status).toBe(200);
    })
    test("Should return text", async () => {
        const response = await request(baseURL).get("/api")
        expect(response.text).toBeDefined();
    })
});