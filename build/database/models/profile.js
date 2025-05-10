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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const profileSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    imgUrl: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ["personal", "business"],
        default: "personal",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});
const Profile = mongoose_1.default.model("Profile", profileSchema);
const changeStream = Profile.watch();
changeStream.on("change", (change) => __awaiter(void 0, void 0, void 0, function* () {
    if (change.operationType === "insert") {
        try {
            yield config_1.agenda.start();
            config_1.agenda.define("DeleteProfile", (job, done) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield Profile.findByIdAndDelete(job.attrs.data.id);
                    yield job.remove();
                }
                catch (error) {
                    console.log(error.message);
                }
                done();
            }));
            yield config_1.agenda.schedule("in 1 week", "DeleteProfile", {
                id: change.fullDocument._id,
            });
        }
        catch (error) {
            console.log("Something went wrong", error);
        }
    }
}));
exports.default = Profile;
