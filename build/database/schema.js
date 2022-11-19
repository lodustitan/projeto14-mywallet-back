"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
const joi_1 = __importDefault(require("joi"));
class Schema {
    newAccountSchema;
    loginAccountSchema;
    userSchema;
    walletCreateSchema;
    walletDeleteSchema;
    walletUpdateSchema;
    constructor() {
        this.userSchema = joi_1.default.object({
            uid: joi_1.default.string().required()
        });
        this.newAccountSchema = joi_1.default.object({
            name: joi_1.default.string().min(4).max(24).required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(6).required(),
            confirm_password: joi_1.default.any().valid(joi_1.default.ref('password')).required()
        });
        this.loginAccountSchema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(6).required()
        });
        this.walletCreateSchema = joi_1.default.object({
            owneruid: joi_1.default.string().min(1).required(),
            value: joi_1.default.number().required(),
            description: joi_1.default.string().min(1).max(40).required(),
            type: joi_1.default.string().valid('entrada', 'saida').required()
        });
        this.walletDeleteSchema = joi_1.default.object({
            owneruid: joi_1.default.string().min(1).required(),
            uid: joi_1.default.string().min(1).required()
        });
        this.walletUpdateSchema = joi_1.default.object({
            owneruid: joi_1.default.string().min(1).required(),
            uid: joi_1.default.string().min(1).required(),
            value: joi_1.default.number().required(),
            description: joi_1.default.string().min(1).max(40).required()
        });
    }
}
exports.schemas = new Schema();
