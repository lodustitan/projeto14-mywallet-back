import Joi from "joi";

class Schema
{
    newAccountSchema;
    loginAccountSchema;
    walletCreateSchema;
    walletDeleteSchema;
    walletUpdateSchema;

    constructor(){
        this.newAccountSchema = Joi.object({
            name: Joi.string().min(4).max(24).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.any().valid(Joi.ref('password')).required() 
        });
        this.loginAccountSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        });
        this.walletCreateSchema = Joi.object({
            ownerUid: Joi.string().required(), 
            value: Joi.number().required(),
            description: Joi.string().min(1).max(40). required(),
            type: Joi.string().valid('entrada','saida').required()
        });
        this.walletDeleteSchema = Joi.object({
            ownerUid: Joi.string().required(), 
            uid: Joi.string().required()
        })
        this.walletUpdateSchema = Joi.object({
            ownerUid: Joi.string().required(), 
            uid: Joi.string().required(),
            value: Joi.number().required(),
            description: Joi.string().min(1).max(40). required()
        })
    }
}

export const schemas = new Schema()