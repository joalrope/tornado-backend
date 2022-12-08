"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronRouter = void 0;
const express_1 = require("express");
const cron_1 = require("../controllers/cron");
exports.cronRouter = (0, express_1.Router)();
exports.cronRouter.post('/cron', [], cron_1.cronController);
