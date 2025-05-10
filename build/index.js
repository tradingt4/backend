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
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const routes_1 = __importDefault(require("./restful/routes"));
const users_1 = require("./utils/users");
const config_1 = require("./database/config");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
// Running when user connects
io.on("connection", (socket) => {
    socket.on("joinRoom", (data) => {
        const user = (0, users_1.userJoin)({
            id: data.user,
            username: data.username,
            room: data.room,
            img: data.profileUrl,
            joinedAt: new Date(),
        });
        socket.join(user.room);
        //Welcome user
        socket.emit("connected", "You're connected to the movement");
        socket.broadcast
            .to(user.room)
            .emit("connected", `${user.username} has joined the movement`);
        socket.on("locationChanged", (data) => {
            const { user, lat, long } = data;
            const userA = (0, users_1.getCurrentUser)(user);
            if (!userA)
                return;
            io.to(userA.room).emit("locationChanged", {
                user: userA.id,
                lat,
                long,
            });
        });
        //Chatting message
        socket.on("chatMessage", (data) => {
            const { userId, message } = data;
            const userA = (0, users_1.getCurrentUser)(userId);
            if (!userA)
                return;
            io.to(userA.room).emit("chatMessage", {
                userId,
                message,
                sentAt: new Date(),
            });
        });
        //Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: (0, users_1.getRoomUsers)(user.room),
        });
        //Runs when clients disconnect
        socket.on("disconnect", () => {
            const leavingUser = (0, users_1.userLeave)(user.id);
            if (!leavingUser)
                return;
            io.to(leavingUser.room).emit("connected", `${leavingUser.username} has left the party`);
            //Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: (0, users_1.getRoomUsers)(user.room),
            });
        });
    });
});
// Default home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Quick step App backend!",
    });
});
// Restful API routes
app.use("/api/v1/", routes_1.default);
app.get("*", (req, res) => {
    res.json({
        message: "Invalid path URL!",
    });
});
// Listening on the PORT server
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${PORT} 🔥`);
    yield (0, config_1.connectDB)();
}));
