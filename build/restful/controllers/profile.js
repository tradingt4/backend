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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = __importDefault(require("../../utils/respond"));
const profile_1 = __importDefault(require("../../database/models/profile"));
const mongoose_1 = __importDefault(require("mongoose"));
class ProfileController {
}
exports.default = ProfileController;
_a = ProfileController;
/// Create profile of the user
ProfileController.createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        const userId = res.locals.accountId;
        if (!userId)
            throw new Error("User not logged in");
        const imgUrl = res.locals.profileImageUrl;
        const { username, email } = req.body;
        if (!imgUrl || !username || !email)
            throw new Error("All fields are required");
        const profile = yield profile_1.default.create({ username, email, imgUrl, userId });
        return respond.success(200, {
            message: "User profile created successfully",
            data: profile,
            // data: profile,
        });
    }
    catch (error) {
        return respond.error(error);
    }
});
ProfileController.getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        const userId = res.locals.accountId;
        if (!userId)
            throw new Error("User not logged in");
        const profile = yield profile_1.default.findOne({ userId });
        return respond.success(200, {
            message: "User profile retrieved successfully",
            data: profile,
        });
    }
    catch (error) {
        return respond.error(error);
    }
});
ProfileController.getMultipleProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        const userId = res.locals.accountId;
        if (!userId)
            throw new Error("User not logged in");
        const ids = req.body.users.filter((id, index) => mongoose_1.default.Types.ObjectId.isValid(id) &&
            req.body.users.indexOf(id) === index);
        if (ids.length < 1) {
            return respond.success(400, {
                message: "Can't find users selected",
                data: undefined,
            });
        }
        const profiles = yield profile_1.default.find({ userId: { $in: ids } });
        return respond.success(200, {
            message: "Profiles retrieved successfully",
            count: profiles.length,
            data: profiles,
        });
    }
    catch (error) {
        return respond.error(error);
    }
});
