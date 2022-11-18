import { Router } from "express";
import { middleware } from "../middlewares/auth.js";
import { userController } from "../controllers/user.controller.js";

const app = Router();

app.post("/sign-in", middleware.verifyLoginModel, userController.signIn);
app.post("/sign-up", middleware.verifyRegisterModel, userController.signUp);

export default app;