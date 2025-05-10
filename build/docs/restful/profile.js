"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileDefinitions = exports.profile = void 0;
const responses_1 = __importDefault(require("../responses"));
exports.profile = {
    "/profile": {
        get: {
            tags: ["Profile"],
            summary: "View profile",
            description: "view your profile details",
            operationId: "viewProfile",
            security: [
                {
                    JWT: [],
                },
            ],
            responses: responses_1.default,
        },
    },
    "/profile/create": {
        post: {
            tags: ["Profile"],
            summary: "Create profile",
            description: "Create your own profile",
            operationId: "createProfile",
            parameters: [
                {
                    name: "body",
                    in: "body",
                    consumes: ["multipart/form-data"],
                    description: "Create profile associated with your acccount",
                    required: true,
                    schema: {
                        $ref: "#/definitions/create-profile",
                    },
                },
            ],
            security: [
                {
                    JWT: [],
                },
            ],
            responses: responses_1.default,
        },
    },
};
exports.profileDefinitions = {
    "create-profile": {
        type: "object",
        properties: {
            email: {
                type: "string",
                required: true,
            },
            profilePic: {
                // type: "string",
                format: "binary",
                required: true,
            },
            username: {
                type: "string",
                required: true,
            },
        },
    },
};
