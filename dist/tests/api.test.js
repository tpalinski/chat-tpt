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
dotenv_1.default.config();
const port = process.env.PORT || 3001;
const baseURL = `http://localhost:${port}`;
describe("GET /", () => {
    test("Should return status: 301", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL).get("/");
        expect(response.status).toBe(301);
    }));
    test("Should redirect to /api", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL).get("/");
        expect(response.redirect).toBe(true);
    }));
});
describe("GET /api", () => {
    test("Should return status: 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL).get("/api");
        expect(response.status).toBe(200);
    }));
    test("Should return text", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(baseURL).get("/api");
        expect(response.text).toBeDefined();
    }));
});
