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
exports.uploadPhoto = void 0;
const respond_1 = __importDefault(require("../../utils/respond"));
const s3_1 = require("../../utils/s3");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const unlinkFile = util_1.default.promisify(fs_1.default.unlink);
const uploadPhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        if (!req.file)
            throw new Error("Profile photo required");
        yield (0, s3_1.uploadFile)(req.file);
        yield unlinkFile(req.file.path);
        const imgUrl = yield (0, s3_1.getImageUrl)(req.file.filename);
        res.locals.profileImageUrl = imgUrl;
        next();
    }
    catch (error) {
        return respond.error(error);
    }
});
exports.uploadPhoto = uploadPhoto;
