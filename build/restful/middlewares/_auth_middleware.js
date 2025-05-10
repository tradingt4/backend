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
const account_1 = __importDefault(require("../../database/models/account"));
const helpers_1 = require("../../utils/helpers");
const respond_1 = __importDefault(require("../../utils/respond"));
class AuthMiddleWare {
    //check if the user already has account
    static isAccountExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const respond = new respond_1.default(res);
            try {
                const { email } = req.body;
                const exist = yield account_1.default.findOne({ email });
                if (exist) {
                    return respond.success(409, {
                        message: "Account already exists",
                        data: undefined,
                    });
                }
                next();
            }
            catch (error) {
                return respond.error(error);
            }
        });
    }
    //check if the account is authorized
    static isLoggedIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const respond = new respond_1.default(res);
            try {
                if (!req.headers.authorization) {
                    return respond.success(400, {
                        message: "User not logged in",
                        data: undefined,
                    });
                }
                const { accountId } = (0, helpers_1.verifyToken)(req.headers.authorization.split(" ")[1]);
                if (!accountId) {
                    throw new Error("Invalid auth token");
                }
                res.locals.accountId = accountId;
                next();
            }
            catch (error) {
                return respond.success(400, {
                    message: "Invalid auth token",
                    data: error.message,
                });
            }
        });
    }
    //Check if the user is admin
    static isAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const respond = new respond_1.default(res);
            try {
                const id = res.locals.accountId;
                if (!id)
                    throw new Error("User not logged in");
                const exist = yield account_1.default.findById(id);
                if (!exist) {
                    return respond.success(404, {
                        message: "Account not exist",
                        data: undefined,
                    });
                }
                if (exist.role !== "admin") {
                    return respond.success(401, {
                        message: "Login as Admin to perform this action",
                        data: undefined,
                    });
                }
                next();
            }
            catch (error) {
                return respond.error(error);
            }
        });
    }
}
exports.default = AuthMiddleWare;
