"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtValidator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtValidator = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion",
        });
    }
    try {
        const { uid, name } = (0, jsonwebtoken_1.verify)(token, `${process.env.SECRET_JWT_SEED}`);
        req.params.uid = uid;
        req.params.name = name;
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no válido",
        });
    }
    next();
};
exports.jwtValidator = jwtValidator;
