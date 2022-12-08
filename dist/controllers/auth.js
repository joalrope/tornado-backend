"use strict";
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
exports.revalidateToken = exports.userLogin = exports.createUser = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const jwt_1 = require("../helper/jwt");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        ok: true,
        uid: "hghghhffd",
        name: "joalrope",
        token: "token valido",
    });
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.User.findOne({ email });
        if (user) {
            return res.status(200).json({
                ok: false,
                msg: `Ya existe un usuario con el correo ${email}`,
            });
        }
        else {
            user = new User_1.User(req.body);
            //Encriptar contraseña
            const salt = bcryptjs_1.default.genSaltSync();
            user.password = bcryptjs_1.default.hashSync(password, salt);
            yield user.save();
            // Generar JWT (Json Web Token)
            const token = yield (0, jwt_1.generateJWT)(user.id, user.name, "user");
            res.status(201).json({
                ok: true,
                uid: user.id,
                name: user.name,
                role: "user",
                token,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
});
exports.createUser = createUser;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        // Verificar si existe el usuario
        if (!user) {
            return res.status(200).json({
                ok: false,
                msg: `El usuario y/o contraseña no son correctos`,
            });
        }
        // Confirmar match del password enviado
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(200).json({
                ok: false,
                msg: "El usuario y/o contraseña no son correctos",
            });
        }
        //Generar JWT (Json Web Token)
        const token = yield (0, jwt_1.generateJWT)(user.id, user.name, user.role);
        res.status(201).json({
            ok: true,
            msg: "Inicio de sesión exitoso",
            uid: user.id,
            name: user.name,
            role: user.role,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
});
exports.userLogin = userLogin;
const revalidateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, name, role } = req.params;
    const token = yield (0, jwt_1.generateJWT)(uid, name, role);
    res.status(500).json({
        ok: true,
        msg: "Nuevo token",
        uid,
        name,
        token,
    });
});
exports.revalidateToken = revalidateToken;
