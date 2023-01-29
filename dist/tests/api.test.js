"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const supertest_1 = __importDefault(require("supertest"));
const db_1 = require("../db");
dotenv_1.default.config();
const port = process.env.PORT || 3001;
const baseURL = `http://localhost:${port}`;
const validUser = {
    email: "testingUser@test.com",
    nickname: "Hejur",
    password: "qwerty123"
};
const invalidUser = {
    email: "dgasgads",
    nickname: "",
    password: ""
};
const nonUser = {
    email: "tfahfadhfa",
    nickname: "hafdhfads",
    password: "qwerty123"
};
describe("GET /", () => {
    test("Should return status: 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL).get("/");
        expect(response.status).toBe(404);
    }));
});
describe("POST /user/signup", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.deleteUser)(validUser);
    }));
    test("Should return status 400 with no user attached", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL)
            .post("/user/signup")
            .send({});
        expect(response.status).toBe(400);
    }));
    test("Should return status 201 with valid user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL)
            .post("/user/signup")
            .send(validUser);
        expect(response.status).toBe(201);
    }));
    test("Should return status 418 with user who is already in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL)
            .post("/user/signup")
            .send(validUser);
        expect(response.status).toBe(418);
    }));
    test("Should return status 400 with invalid user object", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL)
            .post("/user/signup")
            .send(invalidUser);
        expect(response.status).toBe(400);
    }));
});
describe("GET /user", () => {
    test("Should return status 400 with no user attached", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL)
            .get("/user")
            .send({});
        expect(response.status).toBe(400);
    }));
    test("Should return status 404 with user who is not in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL)
            .get("/user")
            .send(nonUser);
        expect(response.status).toBe(404);
    }));
    test("Should return status 200 with user who is in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL)
            .get("/user")
            .send(validUser);
        expect(response.status).toBe(200);
    }));
    test("Should return information about the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL)
            .get("/user")
            .send(validUser);
        expect(response.body).toEqual({
            email: validUser.email,
            nickname: validUser.nickname,
        });
    }));
});
describe("POST /user/login", () => {
    test("Should return status 400 with no user attached", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL)
            .post("/user/login")
            .send({});
        expect(response.status).toBe(400);
    }));
    test("Should return status 200 with good credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL)
            .post("/user/login")
            .send({
            email: validUser.email,
            password: validUser.password
        });
        expect(response.status).toBe(200);
    }));
});
