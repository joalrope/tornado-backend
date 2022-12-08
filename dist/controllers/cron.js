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
exports.cronController = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const ethers_1 = require("./ethers");
const receivers_1 = require("./receivers");
const cronController = (amount) => {
    node_cron_1.default.schedule('*/2 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(new Date().toLocaleString());
        let i = 1;
        const porcInc = 0.1;
        for (const address of receivers_1.receivers) {
            const fee = (amount / 17.53116706) * (1 + porcInc) ** i;
            console.log({ i, fee, address });
            const result = yield (0, ethers_1.sendBNB)('0x67e9EE837eFbFDF2423F6B5CDE5b07803eb31CC8', address, '72bfc9cbee925de33cafec44da078dafad37d295e365b783050021ae16f43b97', fee);
            console.log({ i, address, fee, result });
            i++;
        }
    }));
};
exports.cronController = cronController;
