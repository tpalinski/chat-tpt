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
const supertest_1 = __importDefault(require("supertest"));
const testVar_1 = require("./testVar");
describe("GET /", () => {
    test("Should return status: 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL).get("/");
        expect(response.status).toBe(404);
    }));
});
describe("GET /user", () => {
    test("Should return status 400 with no user attached", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .get("/user")
            .send({});
        expect(response.status).toBe(400);
    }));
    test("Should return status 404 with user who is not in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .get("/user")
            .send(testVar_1.nonUser);
        expect(response.status).toBe(404);
    }));
    test("Should return status 200 with user who is in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .get("/user")
            .send(testVar_1.validUser);
        expect(response.status).toBe(200);
    }));
    test("Should return information about the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .get("/user")
            .send(testVar_1.validUser);
        expect(response.body).toEqual({
            email: testVar_1.validUser.email,
            nickname: testVar_1.validUser.nickname,
        });
    }));
});
