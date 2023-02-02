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
const testVar_1 = require("./testVar");
const supertest_1 = __importDefault(require("supertest"));
describe("POST /user/login", () => {
    test("Should return status 400 with no user attached", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .post("/user/login")
            .send({});
        expect(response.status).toBe(400);
    }));
    test("Should return status 200 with good credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .post("/user/login")
            .send({
            email: testVar_1.validUser.email,
            password: testVar_1.validUser.password
        });
        expect(response.status).toBe(200);
    }));
    test("Should return status 404 with non-existent user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .post("/user/login")
            .send(testVar_1.nonUser);
        expect(response.status).toBe(404);
    }));
    test("Should return status 400 with wrong credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .post("/user/login")
            .send({
            email: testVar_1.validUser.email,
            password: "clearlywrongpassword"
        });
        expect(response.status).toBe(400);
    }));
    test("Should return status 400 with invalid user object", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(testVar_1.baseURL)
            .post("/user/login")
            .send({
            password: "password"
        });
        expect(response.status).toBe(400);
    }));
});
