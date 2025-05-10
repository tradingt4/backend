"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const account_1 = require("./restful/account");
const movements_1 = require("./restful/movements");
const notifications_1 = require("./restful/notifications");
const profile_1 = require("./restful/profile");
dotenv_1.default.config();
const paths = Object.assign(Object.assign(Object.assign(Object.assign({}, account_1.account), profile_1.profile), movements_1.movement), notifications_1.notification);
const definitions = Object.assign(Object.assign(Object.assign({}, account_1.accountDefinitions), profile_1.profileDefinitions), movements_1.movementDefinitions);
const host = process.env.NODE_ENV === "production"
    ? (_a = process.env.BASE_URL) === null || _a === void 0 ? void 0 : _a.split("https://")[1]
    : (_b = process.env.BASE_URL) === null || _b === void 0 ? void 0 : _b.split("http://")[1];
const config = {
    swagger: "2.0",
    info: {
        title: "Quick step API Documentation",
        version: "1.0.0",
        description: "Real-time live location tracking app in Flutter - Backend API",
    },
    host,
    basePath: "/api/v1",
    schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
    securityDefinitions: {
        JWT: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
        },
    },
    paths,
    // consumes: ["multipart/form-data"],
    definitions,
};
exports.default = config;
