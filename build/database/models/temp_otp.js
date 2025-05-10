"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const otp_1 = __importDefault(require("../../services/otp"));
const send_mail_1 = require("../../services/send_mail");
const tempOTPSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    otp: { type: Number, required: true },
});
const TempOTP = mongoose_1.default.model("TempOTP", tempOTPSchema);
const changeStream = TempOTP.watch();
changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
        //Send an email notification
        const { email, otp } = change.fullDocument;
        // console.log();
        (0, send_mail_1.sendEmail)(email, otp);
        //Schedule a task to delete this in 2 hours
        otp_1.default.deleteOTP(change.fullDocument._id);
    }
});
exports.default = TempOTP;
