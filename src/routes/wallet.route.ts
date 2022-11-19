import { Router } from "express";
import { middleware } from './../middlewares/auth';
import { walletController } from "../controllers/wallet.controller";

const app = Router();

app.post("/wallet", middleware.verifyWalletCreateModel, walletController.createWallet);
app.post("/mywallet", middleware.verifyUser, walletController.getWallets);
app.put("/edit", middleware.verifyWalletUpdateModel, walletController.updateWallet);
app.delete("/wallet", middleware.verifyWalletDeleteModel, walletController.deleteWallet);

export default app;