"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const respond_1 = __importDefault(require("../respond"));
class ProfileValidate {
    static getMultiple(req, res, next) {
        const schema = joi_1.default.object().keys({
            users: joi_1.default.array().items(joi_1.default.string().min(5)).required().min(1),
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
exports.default = ProfileValidate;
