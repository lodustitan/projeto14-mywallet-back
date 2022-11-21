import { IRepository } from "../types/types.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import client from "../database/database.js";

class Repository implements IRepository
{
    async createAccount(name: string, email: string, password: string): Promise<void>
    {
        try
        {
            const uid = uuidv4();
    
            bcrypt.hash(password, 10, async function(err, hash) {
                await client
                    .db("myWallet")
                    .collection("user")
                    .insertOne({uid, name, email, password: hash});
            });
        }
        catch(err)
        {
            console.error(err);
        }

    }
    async loginAccount(email: string, password: string): Promise<any>
    {        
        let myUid: string = "";
        let myName: string = "";

        const query = await client
                .db("myWallet")
                .collection("user")
                .findOne({email});

        if(query)
        {
            if( bcrypt.compareSync(password, query.password) )
                myUid = query.uid;
                myName = query.name;
        }

        return {uid: myUid, name: myName};
    }
    async addWalletData(ownerUid:string, value: number, description: string, type: string): Promise<void>
    {
        const uid = uuidv4();
        const today = dayjs().format("DD/MM");  
        
        await client
            .db("myWallet")
            .collection("wallet")
            .insertOne({ownerUid, uid, value, description, type, date: today});
    }
    async removeWalletData(uid: string): Promise<void>
    {
        await client
            .db("myWallet")
            .collection("wallet")
            .deleteOne({uid});
    }
    async editWalletData(uid: string, value: number, description: string): Promise<void>
    {
        await client
            .db("myWallet")
            .collection("wallet")
            .updateOne({uid}, {$set: {value, description}});
    }
    async getAllWalletUser(userUid: string)
    {
        const query = await client
            .db("myWallet")
            .collection("wallet")
            .find({ownerUid: userUid})
            .toArray();
        
        return query;
    }
}

export const repository = new Repository(); 