import dotenv from 'dotenv';
import express from "express";
import userRoute from "./routes/user.route";
import walletRoute from "./routes/wallet.route";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(walletRoute);

const port = process.env.PORT 
app.listen(port, ()=>{
    console.log(`Conectado na porta ${port}`);
});