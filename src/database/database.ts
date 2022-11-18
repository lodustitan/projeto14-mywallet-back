import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config()
let client: MongoClient;


if(process.env.MONGO_URI)
    client = new MongoClient(process.env.MONGO_URI);
else
    throw new Error("falha ao conectar o mongodb");

    try
    {
        client.connect();
    }
    catch(err)
    {
        console.error(err);
    }

export default client;