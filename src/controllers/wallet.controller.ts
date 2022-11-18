import { Request, Response } from "express";
import { StatusCode } from "../types/types";
import { repository } from "../repository/repository";

class WalletController
{
    async createWallet(req: Request, res: Response)
    {
        const { data } = res.locals;

        try
        {
            await repository.addWalletData(data.ownerUid, data.value, data.description, data.type);
            res.send("Wallet criado.").status(StatusCode.Created);
        }
        catch(err)
        {
            console.error(err);
        }
    }
    async deleteWallet(req: Request, res: Response)
    {
        const { data } = res.locals;

        try
        {
            await repository.removeWalletData(data.uid);
            res.send("Wallet criado.").status(StatusCode.Created);
        }
        catch(err)
        {
            console.error(err);
        }
    }
    async updateWallet(req: Request, res: Response)
    {
        const { data } = res.locals;

        try
        {
            await repository.editWalletData(data.uid, data.value, data.description);
            res.send("Wallet criado.").status(StatusCode.Created);
        }
        catch(err)
        {
            console.error(err);
        }
    }
}

export const wallerController = new WalletController();