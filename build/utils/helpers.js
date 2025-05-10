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
exports.verifyToken = exports.generateToken = exports.comparePwd = exports.hashPwd = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/// Encrypting password
const hashPwd = (pwd) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    return yield bcrypt_1.default.hash(pwd, salt);
});
exports.hashPwd = hashPwd;
/// Decrypt the password
const comparePwd = (bodyPwd, dbPwd) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(bodyPwd, dbPwd);
});
exports.comparePwd = comparePwd;
//Generate token
const generateToken = (id) => {
    const secret = process.env.JWT_TOKEN_SECRET || "jwt-secret";
    return jsonwebtoken_1.default.sign({ accountId: id }, secret, {
        expiresIn: "5 days",
    });
};
exports.generateToken = generateToken;
/// Verifying jwt token
function verifyToken(token) {
    const verify = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET || "jwt-secret");
    return verify;
}
exports.verifyToken = verifyToken;
