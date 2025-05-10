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
const otp_generator_1 = __importDefault(require("otp-generator"));
const config_1 = require("../database/config");
const temp_otp_1 = __importDefault(require("../database/models/temp_otp"));
const DELETE_OTP = "DELETE_OTP";
class OTPService {
}
exports.default = OTPService;
_a = OTPService;
/// Generating new OTP
OTPService.generateOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uniqueNumber = otp_generator_1.default.generate(4, {
            digits: true,
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });
        yield temp_otp_1.default.create({
            email: email,
            otp: Number(uniqueNumber),
        });
    }
    catch (error) {
        console.log(error.message);
    }
});
/// Deleting OTP after two hours
OTPService.deleteOTP = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield config_1.agenda.start();
        config_1.agenda.define(DELETE_OTP, (job, done) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield temp_otp_1.default.findByIdAndDelete(job.attrs.data.id);
                yield job.remove();
            }
            catch (error) {
                console.log(error.message);
            }
            done();
        }));
        // await agenda.now(DELETE_OTP, { id });
        yield config_1.agenda.schedule("in 2 hours", DELETE_OTP, { id });
    }
    catch (error) {
        console.log("Something went wrong", error);
    }
});
OTPService.getOTP = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    return yield temp_otp_1.default.findOne(otp);
});
OTPService.checkUserOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield temp_otp_1.default.findOne({ email });
});
