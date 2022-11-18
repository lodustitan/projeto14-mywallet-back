"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const types_1 = require("./../types/types");
const repository_1 = require("../repository/repository");
class UserController {
    async signUp(req, res) {
        const { data } = res.locals;
        try {
            await repository_1.repository.createAccount(data.name, data.email, data.password);
            res.send("conta cadastrada").status(types_1.StatusCode.Created);
        }
        catch (err) {
            console.error(err);
            throw new Error("signUp erro com repository.");
        }
    }
    async signIn(req, res) {
        const { data } = res.locals;
        try {
            const uid = await repository_1.repository.loginAccount(data.email, data.password);
            res.send({ uid }).status(types_1.StatusCode.OK);
        }
        catch (err) {
            console.error(err);
            throw new Error("signIn erro com repository.");
        }
    }
}
exports.userController = new UserController();
