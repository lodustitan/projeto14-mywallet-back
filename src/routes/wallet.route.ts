import { Router } from "express";
import { middleware } from './../middlewares/auth';
import { wallerController } from "../controllers/wallet.controller";

const app = Router();

app.post("/wallet", middleware.verifyWalletCreateModel, wallerController.createWallet);
app.put("/edit", middleware.verifyWalletUpdateModel, wallerController.updateWallet);
app.delete("/wallet", middleware.verifyWalletDeleteModel, wallerController.deleteWallet);

export default app;