"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repository = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_js_1 = __importDefault(require("../database/database.js"));
class Repository {
    async createAccount(name, email, password) {
        try {
            const uid = (0, uuid_1.v4)();
            bcrypt_1.default.hash(password, 10, async function (err, hash) {
                await database_js_1.default
                    .db("myWallet")
                    .collection("user")
                    .insertOne({ uid, name, email, password: hash });
            });
        }
        catch (err) {
            console.error(err);
        }
    }
    async loginAccount(email, password) {
        let myUid = "";
        const query = await database_js_1.default
            .db("myWallet")
            .collection("user")
            .findOne({ email });
        if (query) {
            if (bcrypt_1.default.compareSync(password, query.password))
                return myUid = query.uid;
        }
        return myUid;
    }
    async addWalletData(ownerUid, value, description, type) {
        const uid = (0, uuid_1.v4)();
        await database_js_1.default
            .db("myWallet")
            .collection("wallet")
            .insertOne({ ownerUid, uid, value, description, type });
    }
    async removeWalletData(uid) {
        await database_js_1.default
            .db("myWallet")
            .collection("wallet")
            .deleteOne({ uid });
    }
    async editWalletData(uid, value, description) {
        await database_js_1.default
            .db("myWallet")
            .collection("wallet")
            .updateOne({ uid }, { $set: { value, description } });
    }
}
exports.repository = new Repository();
