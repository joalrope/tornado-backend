"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnectionSatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnectionSatus = (req, res, next) => {
    const status = mongoose_1.default.connection.readyState;
    if (status === 0) {
        res.status(501).json({
            ok: false,
            msg: "No hay conexión con la base de datos",
            result: {},
        });
    }
    next();
};
exports.dbConnectionSatus = dbConnectionSatus;
