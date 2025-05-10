"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification = void 0;
const responses_1 = __importDefault(require("../responses"));
exports.notification = {
    //Getting all notifications
    "/notifications": {
        get: {
            tags: ["Notification"],
            summary: "All notifications",
            description: "Getting all your created/invited notifications",
            operationId: "getNotifications",
            security: [
                {
                    JWT: [],
                },
            ],
            responses: responses_1.default,
        },
    },
    //Delete notification
    "/notifications/:id": {
        delete: {
            tags: ["Notification"],
            summary: "Delete notification",
            description: "Delete notification sent to you",
            operationId: "deleteNotification",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Notification id to be deleted",
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
