import { Router } from "express";
import authController from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/log-in", authController.logIn);
authRouter.delete("/log-out", authController.logOut);
authRouter.post("/token", authController.refreshToken);

export default authRouter;