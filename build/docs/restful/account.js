"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountDefinitions = exports.account = void 0;
const responses_1 = __importDefault(require("../responses"));
exports.account = {
    //Create a new account
    "/accounts/create": {
        post: {
            tags: ["Account"],
            summary: "Create a new account",
            description: "Register a new account to be able to access all services of Quick Step",
            operationId: "createAccount",
            parameters: [
                {
                    name: "body",
                    in: "body",
                    description: "Create a new app account",
                    required: true,
                    schema: {
                        $ref: "#/definitions/create",
                    },
                },
            ],
            responses: responses_1.default,
        },
    },
    //Login to account
    "/accounts/login": {
        post: {
            tags: ["Account"],
            summary: "Login an account",
            description: "Login into already existing account",
            operationId: "loginAccount",
            parameters: [
                {
                    name: "body",
                    in: "body",
                    description: "Login an account",
                    required: true,
                    schema: {
                        $ref: "#/definitions/login",
                    },
                },
            ],
            responses: responses_1.default,
        },
    },
    //Verify account
    "/accounts/verify-account": {
        post: {
            tags: ["Account"],
            summary: "Verify account",
            description: "Verify created account by using OTP",
            operationId: "verifyAccount",
            parameters: [
                {
                    name: "body",
                    in: "body",
                    description: "Verify an account by entering the OTP and email",
                    required: true,
                    schema: {
                        $ref: "#/definitions/verify",
                    },
                },
            ],
            responses: responses_1.default,
        },
    },
    //Resend otp
    "/accounts/resend-otp": {
        post: {
            tags: ["Account"],
            summary: "Resend OTP",
            description: "Resending OTP on email if not received or expired",
            operationId: "resendOTP",
            parameters: [
                {
                    name: "body",
                    in: "body",
                    description: "Resending OTP on email if not received or expired",
                    required: true,
                    schema: {
                        $ref: "#/definitions/resend-otp",
                    },
                },
            ],
            responses: responses_1.default,
        },
    },
    //Getting all acounts
    "/accounts": {
        get: {
            tags: ["Account"],
            summary: "All accounts",
            description: "Getting all registered accounts",
            operationId: "getAccounts",
            security: [
                {
                    JWT: [],
                },
            ],
            responses: responses_1.default,
        },
    },
};
exports.accountDefinitions = {
    create: {
        type: "object",
        properties: {
            fullName: {
                type: "string",
                required: true,
                default: "Aime Ndayambaje",
            },
            email: {
                type: "string",
                required: true,
                default: "aimendayambaje25@gmail.com",
            },
            password: {
                type: "string",
                required: true,
                default: "aimelive@123",
            },
        },
    },
    login: {
        type: "object",
        properties: {
            email: {
                type: "string",
                required: true,
                default: "aimendayambaje25@gmail.com",
            },
            password: {
                type: "string",
                required: true,
            },
        },
    },
    verify: {
        type: "object",
        properties: {
            email: {
                type: "string",
                required: true,
                default: "aimendayambaje25@gmail.com",
            },
            otp: {
                type: "number",
                required: true,
                default: 1827,
            },
        },
    },
    "resend-otp": {
        type: "object",
        properties: {
            email: {
                type: "string",
                required: true,
                default: "aimendayambaje25@gmail.com",
            },
        },
    },
};
