"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (uid, name, role) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name, role };
        jsonwebtoken_1.default.sign(payload, `${process.env.SECRET_JWT_SEED}`, {
            expiresIn: "8h",
        }, (err, token) => {
            resolve;
            if (err) {
                console.log(err);
                reject("No se pudo generar el token");
            }
            resolve(token);
        });
    });
};
exports.generateJWT = generateJWT;
