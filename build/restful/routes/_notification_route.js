"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_1 = require("../controllers/notification");
const _auth_middleware_1 = __importDefault(require("../middlewares/_auth_middleware"));
const notificationRoutes = express_1.default.Router();
notificationRoutes.get("/", _auth_middleware_1.default.isLoggedIn, notification_1.getNotifications);
notificationRoutes.delete("/:id", _auth_middleware_1.default.isLoggedIn, notification_1.deleteNotification);
exports.default = notificationRoutes;
