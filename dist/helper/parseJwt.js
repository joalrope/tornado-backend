"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJwt = void 0;
const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const buffer = Buffer.from(base64, "base64");
    return JSON.parse(buffer.toString("utf-8"));
};
exports.parseJwt = parseJwt;
