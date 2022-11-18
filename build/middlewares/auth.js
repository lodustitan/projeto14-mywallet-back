"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const schema_1 = require("../database/schema");
const types_1 = require("../types/types");
class Middleware {
    async verifyRegisterModel(req, res, next) {
        try {
            const validJoi = schema_1.schemas.newAccountSchema.validate(req.body, { abortEarly: false });
            if (validJoi.error) {
                const errorList = validJoi.error.details.map(detail => detail);
                res.send(errorList).status(types_1.StatusCode.UnprocessableEntity);
                return;
            }
            else {
                res.locals.data = req.body;
                next();
            }
        }
        catch (err) {
            res.sendStatus(types_1.StatusCode.InternalServerError);
            return console.error(err);
        }
    }
    async verifyLoginModel(req, res, next) {
        try {
            const validJoi = schema_1.schemas.loginAccountSchema.validate(req.body, { abortEarly: false });
            if (validJoi.error) {
                const errorList = validJoi.error.details.map(detail => detail);
                res.send(errorList).status(types_1.StatusCode.UnprocessableEntity);
                return;
            }
            else {
                res.locals.data = req.body;
                next();
            }
        }
        catch (err) {
            res.sendStatus(types_1.StatusCode.InternalServerError);
            return console.error(err);
        }
    }
    async verifyWalletCreateModel(req, res, next) {
        const { value, description, type } = req.body;
        const { ownerUid } = req.headers;
        try {
            const validJoi = schema_1.schemas.walletCreateSchema.validate({ ownerUid, value, description, type }, { abortEarly: false });
            if (validJoi.error) {
                const errorList = validJoi.error.details.map(detail => detail);
                res.send(errorList).status(types_1.StatusCode.UnprocessableEntity);
                return;
            }
            else {
                res.locals.data = { ...req.body, ...req.headers };
                next();
            }
        }
        catch (err) {
            res.sendStatus(types_1.StatusCode.InternalServerError);
            return console.error(err);
        }
    }
    async verifyWalletDeleteModel(req, res, next) {
        const { uid } = req.body;
        const { ownerUid } = req.headers;
        try {
            const validJoi = schema_1.schemas.walletDeleteSchema.validate({ ownerUid, uid }, { abortEarly: false });
            if (validJoi.error) {
                const errorList = validJoi.error.details.map(detail => detail);
                res.send(errorList).status(types_1.StatusCode.UnprocessableEntity);
                return;
            }
            else {
                res.locals.data = { ...req.body, ...req.headers };
                next();
            }
        }
        catch (err) {
            res.sendStatus(types_1.StatusCode.InternalServerError);
            return console.error(err);
        }
    }
    async verifyWalletUpdateModel(req, res, next) {
        const { value, description, type } = req.body;
        const { ownerUid } = req.headers;
        try {
            const validJoi = schema_1.schemas.walletUpdateSchema.validate({ ownerUid, value, description, type }, { abortEarly: false });
            if (validJoi.error) {
                const errorList = validJoi.error.details.map(detail => detail);
                res.send(errorList).status(types_1.StatusCode.UnprocessableEntity);
                return;
            }
            else {
                res.locals.data = { ...req.body, ...req.headers };
                next();
            }
        }
        catch (err) {
            res.sendStatus(types_1.StatusCode.InternalServerError);
            return console.error(err);
        }
    }
}
exports.middleware = new Middleware();
