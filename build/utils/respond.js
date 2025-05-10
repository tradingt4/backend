"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Respond {
    constructor(res) {
        this.res = res;
    }
    success(code, data) {
        return this.res.status(code).json(data);
    }
    error(error) {
        return this.res
            .status(error.status || 500)
            .json({ message: error.message });
    }
}
exports.default = Respond;
