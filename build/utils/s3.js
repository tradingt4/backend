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
exports.getImageUrl = exports.uploadFile = void 0;
// import S3 from "aws-sdk/clients/s3";
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv = __importStar(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
dotenv.config();
//AWS keys
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCES_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
//Declaring new S3 client instance
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
    region,
});
// Upload a file to S3
function uploadFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileStream = fs_1.default.createReadStream(file.path);
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename,
            ContentType: file.mimetype,
        };
        const command = new client_s3_1.PutObjectCommand(uploadParams);
        return yield s3.send(command);
    });
}
exports.uploadFile = uploadFile;
//Get imageUrl
function getImageUrl(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const getObjectParams = {
            Bucket: bucketName,
            Key: key,
        };
        const command = new client_s3_1.GetObjectCommand(getObjectParams);
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 604800 });
        return url;
    });
}
exports.getImageUrl = getImageUrl;
