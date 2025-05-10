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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.getNotifications = exports.sendNotification = void 0;
const notification_1 = __importDefault(require("../../database/models/notification"));
//Sending new notification
function sendNotification(message, action, to, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield notification_1.default.create({
                message,
                action,
                to,
                data,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.sendNotification = sendNotification;
//Getting all notifications
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.accountId;
        if (!id)
            throw new Error("User not logged in");
        const notifications = yield notification_1.default.find({ to: id }).sort({
            createdAt: "desc",
        });
        res.status(200).json({
            message: "Notifications retrieved successfully",
            count: notifications.length,
            notifications,
        });
    }
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});
exports.getNotifications = getNotifications;
//Delete notification
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const to = res.locals.accountId;
        if (!to)
            throw new Error("User not logged in");
        const notification = yield notification_1.default.findOneAndDelete({ _id: id, to });
        if (!notification) {
            return res.status(404).json({
                message: "Notification not found",
            });
        }
        return res
            .status(200)
            .json({ message: "Notification deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteNotification = deleteNotification;
