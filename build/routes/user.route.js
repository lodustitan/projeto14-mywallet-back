"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../middlewares/auth.js");
const user_controller_js_1 = require("../controllers/user.controller.js");
const app = (0, express_1.Router)();
app.post("/sign-in", auth_js_1.middleware.verifyLoginModel, user_controller_js_1.userController.signIn);
app.post("/sign-up", auth_js_1.middleware.verifyRegisterModel, user_controller_js_1.userController.signUp);
exports.default = app;
