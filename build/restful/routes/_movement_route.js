"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _movement_validate_1 = __importDefault(require("../../utils/validations/_movement_validate"));
const movement_1 = require("../controllers/movement");
const _auth_middleware_1 = __importDefault(require("../middlewares/_auth_middleware"));
const movementRoutes = express_1.default.Router();
movementRoutes.get("/", _auth_middleware_1.default.isLoggedIn, movement_1.getAllMovements);
movementRoutes.get("/:id", _auth_middleware_1.default.isLoggedIn, movement_1.getMovement);
movementRoutes.patch("/:id", _auth_middleware_1.default.isLoggedIn, movement_1.leaveMovement);
movementRoutes.post("/create", _auth_middleware_1.default.isLoggedIn, _movement_validate_1.default.create, movement_1.addMovement);
movementRoutes.delete("/:deleteId", _auth_middleware_1.default.isLoggedIn, movement_1.deleteMovement);
exports.default = movementRoutes;
