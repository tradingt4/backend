"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomUsers = exports.userLeave = exports.getCurrentUser = exports.userJoin = void 0;
const users = [];
// Join user to movement
function userJoin(user) {
    users.push(user);
    return user;
}
exports.userJoin = userJoin;
// Get current user
function getCurrentUser(id) {
    return users.find((user) => user.id === id);
}
exports.getCurrentUser = getCurrentUser;
// User leaves room
function userLeave(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}
exports.userLeave = userLeave;
//Getting all room users
function getRoomUsers(room) {
    return users.filter((user) => user.room === room);
}
exports.getRoomUsers = getRoomUsers;
