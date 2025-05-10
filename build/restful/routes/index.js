"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _account_route_1 = __importDefault(require("./_account_route"));
const _movement_route_1 = __importDefault(require("./_movement_route"));
const _notification_route_1 = __importDefault(require("./_notification_route"));
const _profile_route_1 = __importDefault(require("./_profile_route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = __importDefault(require("../../docs"));
const routes = express_1.default.Router();
routes.use("/movements", _movement_route_1.default);
routes.use("/accounts", _account_route_1.default);
routes.use("/notifications", _notification_route_1.default);
routes.use("/profile", _profile_route_1.default);
routes.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default));
exports.default = routes;
