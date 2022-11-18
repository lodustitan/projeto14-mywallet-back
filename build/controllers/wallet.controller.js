"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallerController = void 0;
const types_1 = require("../types/types");
const repository_1 = require("../repository/repository");
class WalletController {
    async createWallet(req, res) {
        const { data } = res.locals;
        try {
            await repository_1.repository.addWalletData(data.ownerUid, data.value, data.description, data.type);
            res.send("Wallet criado.").status(types_1.StatusCode.Created);
        }
        catch (err) {
            console.error(err);
        }
    }
    async deleteWallet(req, res) {
        const { data } = res.locals;
        try {
            await repository_1.repository.removeWalletData(data.uid);
            res.send("Wallet criado.").status(types_1.StatusCode.Created);
        }
        catch (err) {
            console.error(err);
        }
    }
    async updateWallet(req, res) {
        const { data } = res.locals;
        try {
            await repository_1.repository.editWalletData(data.uid, data.value, data.description);
            res.send("Wallet criado.").status(types_1.StatusCode.Created);
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.wallerController = new WalletController();
