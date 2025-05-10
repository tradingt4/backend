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
exports.deleteMovement = exports.leaveMovement = exports.addMovement = exports.getMovement = exports.getAllMovements = void 0;
const movement_1 = __importDefault(require("../../database/models/movement"));
const respond_1 = __importDefault(require("../../utils/respond"));
// Getting all movements
const getAllMovements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.accountId;
        if (!id)
            throw new Error("User not logged in");
        const movements = yield movement_1.default.find({
            $or: [{ creatorId: id }, { actors: { $in: [id] } }],
        }).sort({ updatedAt: -1 });
        return res.status(200).json({
            message: "Movements retrieved successfully",
            count: movements.length,
            data: movements,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getAllMovements = getAllMovements;
// Getting one movement
const getMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        const { id } = req.params;
        const userId = res.locals.accountId;
        if (!userId)
            throw new Error("User not logged in");
        const movement = yield movement_1.default.findById(id);
        if (!movement)
            throw new Error("Movement is no longer exist, it might be deleted by the owner");
        if (movement.creatorId == userId || movement.actors.includes(userId)) {
            return res.status(200).json({
                message: "Movement retrieved successfully",
                data: movement,
            });
        }
        else {
            return respond.success(403, {
                message: "You're no longer a member of this movement",
                data: movement.title,
            });
        }
    }
    catch (error) {
        return respond.error(error);
    }
});
exports.getMovement = getMovement;
// Create new movement
const addMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.accountId;
        if (!id)
            throw new Error("User not logged in");
        const { title, description, creator, actors } = req.body;
        const movement = yield movement_1.default.create({
            title,
            description,
            creator,
            creatorId: id,
            actors,
        });
        return res
            .status(201)
            .json({ message: "Movement created successfully", movement });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.addMovement = addMovement;
// Leaving movement
const leaveMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respond = new respond_1.default(res);
    try {
        const { id } = req.params;
        const userId = res.locals.accountId;
        if (!userId)
            throw new Error("User not logged in");
        const movement = yield movement_1.default.findById(id);
        if (!movement)
            throw new Error("Movement is no longer exist, it might be deleted by the owner");
        if (movement.actors.includes(userId)) {
            const newActors = movement.actors.filter((move) => move != userId);
            yield movement_1.default.findByIdAndUpdate(id, {
                actors: newActors,
            });
            return respond.success(200, {
                message: "You've left the movement forever",
                data: movement.title,
            });
        }
        else {
            return respond.success(403, {
                message: "You're no longer a member of this movement",
                data: movement.title,
            });
        }
    }
    catch (error) {
        return respond.error(error);
    }
});
exports.leaveMovement = leaveMovement;
//Delete movement
const deleteMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deleteId } = req.params;
        const userId = res.locals.accountId;
        if (!userId)
            throw new Error("User not logged in");
        const movement = yield movement_1.default.findOneAndDelete({
            _id: deleteId,
            creatorId: userId,
        });
        if (!movement) {
            return res.status(403).json({
                message: "You're not allowed to delete this movement because you're not a creator",
            });
        }
        return res.status(200).json({ message: "Movement deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteMovement = deleteMovement;
