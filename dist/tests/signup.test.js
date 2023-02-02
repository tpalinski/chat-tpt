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
const db_1 = require("../db");
const testVar_1 = require("./testVar");
const supertest_1 = __importDefault(require("supertest"));
describe("POST /user/signup", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.deleteUser)(testVar_1.validUser);
    }));
    test("Should return status 400 with no user attached", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .post("/user/signup")
            .send({});
        expect(response.status).toBe(400);
    }));
    test("Should return status 201 with valid user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .post("/user/signup")
            .send(testVar_1.validUser);
        expect(response.status).toBe(201);
    }));
    test("Should return status 418 with user who is already in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .post("/user/signup")
            .send(testVar_1.validUser);
        expect(response.status).toBe(418);
    }));
    test("Should return status 400 with invalid user object", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .post("/user/signup")
            .send(testVar_1.invalidUser);
        expect(response.status).toBe(400);
    }));
});
