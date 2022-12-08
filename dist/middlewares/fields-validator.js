"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsValidator = void 0;
const express_validator_1 = require("express-validator");
const fieldsValidator = (req, res, next) => {
    const valResult = express_validator_1.validationResult.withDefaults({
        formatter: (error) => {
            return {
                params: error.param,
                msg: error.msg,
            };
        },
    });
    const errors = valResult(req).array();
    if (!(Object.entries(errors).length === 0)) {
        let preMsg = "";
        if (Object.entries(errors).length > 1) {
            preMsg = "Ocurrieron los siguientes errores: ";
        }
        const msgErrors = errors.map((error) => {
            return `${error.params} ${error.msg}`;
        });
        const msg = `${preMsg}${msgErrors.join(" y ")}`;
        return res.json({
            ok: false,
            msg,
        });
    }
    next();
};
exports.fieldsValidator = fieldsValidator;
