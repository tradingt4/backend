"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function sendEmail(email, otp) {
    const FROM_EMAIL = process.env.SENDER_MAIL;
    const FROM_MAIL_PASSWORD = process.env.SENDER_MAIL_PASSWORD;
    const TO_EMAIL = email;
    //Creating transporter
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: FROM_EMAIL,
            pass: FROM_MAIL_PASSWORD,
        },
    });
    const MailGenerator = new mailgen_1.default({
        theme: "default",
        product: {
            name: "Quick step App",
            link: "https://aimelive.netlify.app/",
        },
    });
    const response = {
        body: {
            name: email,
            intro: "Verify your email by entering OTP below",
            table: {
                data: [
                    {
                        "OTP Verification Number": otp,
                    },
                ],
            },
            outro: "Please note that this OTP will expire in two hours.",
        },
    };
    const mail = MailGenerator.generate(response);
    // Define the message to be sent
    const mailMessage = {
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `Quick step App - Verify OTP`,
        html: mail,
    };
    // // Send the message using the created transport object
    transporter.sendMail(mailMessage, (error) => {
        if (error) {
            console.log("Email service not working ", error);
        }
        else {
            // console.log("Email sent successfully");
        }
    });
}
exports.sendEmail = sendEmail;
