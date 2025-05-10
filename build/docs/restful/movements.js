"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movementDefinitions = exports.movement = void 0;
const responses_1 = __importDefault(require("../responses"));
exports.movement = {
    //Create new movement
    "/movements/create": {
        post: {
            tags: ["Movement"],
            summary: "Create a new movement",
            description: "Start a new movement and invite members to to join you",
            operationId: "createMovement",
            parameters: [
                {
                    name: "body",
                    in: "body",
                    description: "Create a new movement channel",
                    required: true,
                    schema: {
                        $ref: "#/definitions/create-movement",
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
    //Get one movement
    "/movements/:id": {
        get: {
            tags: ["Movement"],
            summary: "Get one movement",
            description: "Get movement informations",
            operationId: "getMovement",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Movement id",
                    require: true,
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
    //Getting all movements
    "/movements": {
        get: {
            tags: ["Movement"],
            summary: "All movements",
            description: "Getting all your created/invited movements",
            operationId: "getMovements",
            security: [
                {
                    JWT: [],
                },
            ],
            responses: responses_1.default,
        },
    },
    //Delete movement
    "/movements/:deleteId": {
        delete: {
            tags: ["Movement"],
            summary: "Delete movement",
            description: "Delete movement you created",
            operationId: "deleteMovement",
            parameters: [
                {
                    name: "deleteId",
                    in: "path",
                    description: "Movement id to be deleted",
                    require: true,
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
exports.movementDefinitions = {
    "create-movement": {
        type: "object",
        properties: {
            title: {
                type: "string",
                required: true,
            },
            description: {
                type: "string",
                required: true,
            },
            creator: {
                type: "string",
                required: true,
            },
            actors: {
                type: "array",
                items: {
                    type: "string",
                },
                required: true,
            },
        },
    },
};
