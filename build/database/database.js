"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let client;
if (process.env.MONGO_URI)
    client = new mongodb_1.MongoClient(process.env.MONGO_URI);
else
    throw new Error("falha ao conectar o mongodb");
try {
    client.connect();
}
catch (err) {
    console.error(err);
}
exports.default = client;
