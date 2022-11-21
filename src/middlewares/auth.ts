import { Request, Response, NextFunction } from "express";
import { schemas } from "../database/schema";
import { StatusCode } from "../types/types";

class Middleware
{
    async verifyUser(req: Request, res: Response, next: NextFunction)
    {
        const { uid } = req.headers;

        const validJoi = schemas.userSchema.validate({uid});

        if(validJoi.error)
        {
            const errorList = validJoi.error.details.map(detail => detail);
            res.send(errorList).status(StatusCode.UnprocessableEntity);
            return;
        }
        else
        {
            res.locals.data = uid;
            next();
        }
    }
    async verifyRegisterModel(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const validJoi = schemas.newAccountSchema.validate(req.body, {abortEarly: false});
        
            if(validJoi.error)
            {
                const errorList = validJoi.error.details.map(detail => detail);
                res.send(errorList).status(StatusCode.UnprocessableEntity);
                return;
            }
            else
            {
                res.locals.data = req.body;
                next();
            }
        }
        catch(err)
        {
            res.sendStatus(StatusCode.InternalServerError);
            return console.error(err);
        }
    }
    async verifyLoginModel(req: Request, res: Response, next: NextFunction)
    {        
        try
        {
            const validJoi = schemas.loginAccountSchema.validate(req.body, {abortEarly: false});

            if(validJoi.error)
            {
                const errorList = validJoi.error.details.map(detail => detail);
                res.send(errorList).status(StatusCode.UnprocessableEntity);
                return;
            }
            else
            {
                res.locals.data = req.body;
                next();
            }
        }
        catch(err)
        {
            res.sendStatus(StatusCode.InternalServerError);
            return console.error(err);
        }
    }
    async verifyWalletCreateModel(req: Request, res: Response, next: NextFunction)
    {
        let { value, description, type } = req.body;
        const { owneruid } = req.headers;

        value = Number(value);
        try
        {
            const validJoi = schemas.walletCreateSchema.validate(
                {owneruid, value, description, type}, 
                {abortEarly: false}
            );
    
            if(validJoi.error)
            {
                const errorList = validJoi.error.details.map(detail => detail);
                res.send(errorList).status(StatusCode.UnprocessableEntity);
                return;
            }
            else
            {
                res.locals.data = {...req.body, ...req.headers};
                next();
            }
        }
        catch(err)
        {
            res.sendStatus(StatusCode.InternalServerError);
            return console.error(err);
        }
    }
    async verifyWalletDeleteModel(req: Request, res: Response, next: NextFunction)
    {
        const { owneruid, uid } = req.headers;

        try
        {
            const validJoi = schemas.walletDeleteSchema.validate(
                {owneruid, uid}, 
                {abortEarly: false}
            );
    
            if(validJoi.error)
            {
                const errorList = validJoi.error.details.map(detail => detail);
                res.send(errorList).status(StatusCode.UnprocessableEntity);
                return;
            }
            else
            {
                res.locals.data = { owneruid, uid };
                next();
            }
        }
        catch(err)
        {
            res.sendStatus(StatusCode.InternalServerError);
            return console.error(err);
        }
    }
    async verifyWalletUpdateModel(req: Request, res: Response, next: NextFunction)
    {
        let { value, description, uid } = req.body;
        const { owneruid } = req.headers;

        value = Number(value);
        
        try
        {
            const validJoi = schemas.walletUpdateSchema.validate(
                {owneruid, value, description, uid}, 
                {abortEarly: false}
            );
    
            if(validJoi.error)
            {
                const errorList = validJoi.error.details.map(detail => detail);
                res.send(errorList).status(StatusCode.UnprocessableEntity);
                return;
            }
            else
            {
                res.locals.data = {...req.body, ...req.headers};
                next();
            }
        }
        catch(err)
        {
            res.sendStatus(StatusCode.InternalServerError);
            return console.error(err);
        }
    }
}

export const middleware = new Middleware();