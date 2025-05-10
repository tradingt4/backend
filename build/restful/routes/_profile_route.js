"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../utils/multer");
const _profile_validate_1 = __importDefault(require("../../utils/validations/_profile_validate"));
const profile_1 = __importDefault(require("../controllers/profile"));
const _auth_middleware_1 = __importDefault(require("../middlewares/_auth_middleware"));
const _upload_photo_1 = require("../middlewares/_upload_photo");
const profileRoutes = express_1.default.Router();
profileRoutes.post("/create", _auth_middleware_1.default.isLoggedIn, multer_1.upload.single("profilePic"), _upload_photo_1.uploadPhoto, profile_1.default.createProfile);
profileRoutes.get("/", _auth_middleware_1.default.isLoggedIn, profile_1.default.getProfile);
profileRoutes.get("/multiple", _profile_validate_1.default.getMultiple, _auth_middleware_1.default.isLoggedIn, profile_1.default.getMultipleProfiles);
exports.default = profileRoutes;
