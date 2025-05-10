"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// const storage = multer.diskStorage({});
const fileFilter = (req, file, callback) => {
    // Check if the file type is valid
    if (!file.mimetype.match(/jpg|jpeg|png|octet-stream/)) {
        const error = new Error("Invalid image file");
        return callback(error);
    }
    // Accept the file
    callback(null, true);
};
exports.upload = (0, multer_1.default)({ dest: "uploads/", fileFilter });
