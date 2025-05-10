"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _user_validate_1 = __importDefault(require("../../utils/validations/_user_validate"));
const account_1 = __importDefault(require("../controllers/account"));
const _auth_middleware_1 = __importDefault(require("../middlewares/_auth_middleware"));
const accountRoutes = express_1.default.Router();
accountRoutes.get("/", _auth_middleware_1.default.isLoggedIn, 
// AuthMiddleWare.isAdmin,
account_1.default.getAllUsers);
accountRoutes.post("/create", _user_validate_1.default.create, _auth_middleware_1.default.isAccountExist, account_1.default.createAccount);
accountRoutes.post("/login", _user_validate_1.default.login, account_1.default.login);
accountRoutes.post("/verify-account", _user_validate_1.default.otp, account_1.default.verifyEmail);
accountRoutes.post("/resend-otp", _user_validate_1.default.email, account_1.default.resendOTP);
exports.default = accountRoutes;
