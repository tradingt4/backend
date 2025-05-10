"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const respond_1 = __importDefault(require("../respond"));
class AuthValidate {
    static create(req, res, next) {
        const schema = joi_1.default.object().keys({
            fullName: joi_1.default.string().required().min(5).max(40),
            email: joi_1.default.string().required().email(),
            password: joi_1.default.string().required().min(6).max(12),
            role: joi_1.default.string().valid("admin", "user"),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return new respond_1.default(res).success(400, {
                message: error.details[0].message.replace(/"/g, ""),
                data: undefined,
            });
        }
        next();
    }
    static otp(req, res, next) {
        const schema = joi_1.default.object().keys({
            email: joi_1.default.string().required().email(),
            otp: joi_1.default.number().integer().max(9999).required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return new respond_1.default(res).success(400, {
                message: error.details[0].message.replace(/"/g, ""),
                data: undefined,
            });
        }
        next();
    }
    static email(req, res, next) {
        const schema = joi_1.default.object().keys({
            email: joi_1.default.string().required().email(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return new respond_1.default(res).success(400, {
                message: error.details[0].message.replace(/"/g, ""),
                data: undefined,
            });
        }
        next();
    }
    static login(req, res, next) {
        const schema = joi_1.default.object().keys({
            email: joi_1.default.string().required().email(),
            password: joi_1.default.string().required().min(6).max(12),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return new respond_1.default(res).success(400, {
                message: error.details[0].message.replace(/"/g, ""),
                data: undefined,
            });
        }
        next();
    }
}
exports.default = AuthValidate;
