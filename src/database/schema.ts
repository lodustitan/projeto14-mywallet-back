import Joi from "joi";

class Schema
{
    newAccountSchema;
    loginAccountSchema;
    userSchema;
    walletCreateSchema;
    walletDeleteSchema;
    walletUpdateSchema;

    constructor(){
        this.userSchema = Joi.object({
            uid: Joi.string().required()
        });
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
            owneruid: Joi.string().min(1).required(), 
            value: Joi.number().required(),
            description: Joi.string().min(1).max(40). required(),
            type: Joi.string().valid('entrada','saida').required()
        });
        this.walletDeleteSchema = Joi.object({
            owneruid: Joi.string().min(1).required(), 
            uid: Joi.string().min(1).required()
        })
        this.walletUpdateSchema = Joi.object({
            owneruid: Joi.string().min(1).required(), 
            uid: Joi.string().min(1).required(),
            value: Joi.number().required(),
            description: Joi.string().min(1).max(40).required()
        })
    }
}

export const schemas = new Schema()