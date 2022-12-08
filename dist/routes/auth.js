"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const fields_validator_1 = require("../middlewares/fields-validator");
const jwt_validator_1 = require("../middlewares/jwt-validator");
const auth_1 = require("../controllers/auth");
exports.userRouter = (0, express_1.Router)();
/*
    Rutas de Usuarios / Auth
    host + api/auth
*/
exports.userRouter.get("/", [], auth_1.getUsers);
exports.userRouter.post("/new", [
    //middleware
    (0, express_validator_1.check)("name").exists().withMessage("es obligatorio"),
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("no es válido")
        .exists()
        .withMessage("es Obligatorio"),
    (0, express_validator_1.check)("password")
        // .matches('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$')
        // .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character'),
        .isLength({ min: 6 })
        .withMessage("debe tener al menos 6 carácteres"),
    fields_validator_1.fieldsValidator,
], auth_1.createUser);
exports.userRouter.post("/", [
    //middleware
    (0, express_validator_1.check)("email")
        .exists()
        .withMessage("es Obligatorio")
        .isEmail()
        .withMessage("no es válido"),
    (0, express_validator_1.check)("password")
        // .matches('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$')
        // .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character'),
        .isLength({ min: 6 })
        .withMessage("debe tener al menos 6 carácteres"),
    fields_validator_1.fieldsValidator,
], auth_1.userLogin);
exports.userRouter.get("/renew", jwt_validator_1.jwtValidator, auth_1.revalidateToken);
