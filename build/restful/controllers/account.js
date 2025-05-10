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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = __importDefault(require("../../database/models/account"));
const profile_1 = __importDefault(require("../../database/models/profile"));
const otp_1 = __importDefault(require("../../services/otp"));
const send_mail_1 = require("../../services/send_mail");
const helpers_1 = require("../../utils/helpers");
const respond_1 = __importDefault(require("../../utils/respond"));
class UserController {
}
exports.default = UserController;
_a = UserController;
// Getting all users
UserController.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        const users = yield profile_1.default.find({
            userId: { $ne: res.locals.accountId },
        });
        return respond.success(200, {
            message: "Users retrieved successfully",
            count: users.length,
            data: users,
        });
    }
    catch (error) {
        return respond.error(error);
    }
});
//Creaeting new account
UserController.createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        const password = yield (0, helpers_1.hashPwd)(req.body.password);
        const account = yield account_1.default.create(Object.assign(Object.assign({}, req.body), { password }));
        return respond.success(201, {
            message: "Account created successfully, verify email",
            data: account,
        });
    }
    catch (error) {
        return respond.error(error);
    }
});
UserController.verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        const { email, otp } = req.body;
        const result = yield otp_1.default.getOTP({ email, otp });
        if (!result)
            throw new Error("OTP not found");
        const data = yield account_1.default.findOneAndUpdate({ email: result.email, verified: false }, { verified: true }, { new: true });
        if (!data)
            throw new Error("Account not found");
        return respond.success(200, {
            message: "Account verified successfully, create profile",
            data,
        });
    }
    catch (error) {
        return respond.error(error);
    }
});
UserController.resendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        const { email } = req.body;
        const result = yield otp_1.default.checkUserOTP(email);
        if (!result) {
            yield otp_1.default.generateOTP(email);
            return respond.success(200, {
                message: "OTP sent successfully",
                data: undefined,
            });
        }
        (0, send_mail_1.sendEmail)(result.email, result.otp);
        return respond.success(200, {
            message: "OTP resent successfully",
            data: undefined,
        });
    }
    catch (error) {
        return respond.error(error);
    }
});
UserController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        const { email, password } = req.body;
        const user = yield account_1.default.findOne({ email });
        if (!user) {
            return respond.success(404, {
                message: "Account does not exist in our system",
                data: email,
            });
        }
        const validPwd = yield (0, helpers_1.comparePwd)(password, user.password);
        if (!validPwd) {
            return respond.success(401, {
                message: "Invalid password",
                data: email,
            });
        }
        const token = (0, helpers_1.generateToken)(user.id);
        return respond.success(200, {
            message: "User logged in successfully",
            data: { user, token },
        });
    }
    catch (error) {
        return respond.error(error);
    }
});
