"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
//import { dbConnection } from './database/config';
//import { dbConnectionSatus } from './middlewares/dbConectionStatus';
const auth_1 = require("./routes/auth");
const cron_1 = require("./routes/cron");
const cron_2 = require("./controllers/cron");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
//dbConnection();
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
//app.use(dbConnectionSatus);
app.use('/api/cipher', cron_1.cronRouter);
app.use('/api/auth', auth_1.userRouter);
const port = process.env.PORT;
(0, cron_2.cronController)(263);
app.listen(port, () => {
    console.log(`⚡️[server]: Servidor corriendo en https://localhost:${port}`);
});
