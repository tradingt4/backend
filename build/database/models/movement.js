"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notification_1 = require("../../restful/controllers/notification");
const movementSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: String, required: true },
    creatorId: { type: String, required: true },
    actors: { type: [String], required: true },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});
const Movement = mongoose_1.default.model("Movement", movementSchema);
const changeStream = Movement.watch();
changeStream.on("change", (change) => {
    switch (change.operationType) {
        case "insert":
            const actors = change.fullDocument.actors;
            actors.forEach((actor) => {
                (0, notification_1.sendNotification)(`${change.fullDocument.creator} has invited you to join the movement ${change.fullDocument.title}`, "JOIN_MOVEMENT", actor, { movementId: change.fullDocument._id });
            });
            break;
        case "delete":
            // console.log(change.documentKey._id);
            break;
        default:
            break;
    }
    // if ( === ) {
    // } else if (change.operationType === "delete") {
    // }
});
exports.default = Movement;
