import { StatusCode } from './../types/types';
import { Request, Response } from "express";
import { repository } from "../repository/repository";

class UserController 
{
    async signUp(req: Request, res: Response)
    {
        const { data } = res.locals;
        try
        {
            await repository.createAccount(data.name, data.email, data.password);
            res.send("conta cadastrada").status(StatusCode.Created);
        }
        catch(err)
        {
            console.error(err);
            throw new Error("signUp erro com repository.");
        }
    }
    async signIn(req: Request, res: Response)
    {
        const { data } = res.locals;
        try
        {
            const uid = await repository.loginAccount(data.email, data.password);
            res.json({uid}).status(StatusCode.OK);
        }
        catch(err)
        {
            console.error(err);
            throw new Error("signIn erro com repository.");
        }
    }
}

export const userController = new UserController();