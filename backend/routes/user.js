import { Router } from "express";
import userController from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.insertUser);
userRouter.delete("/:userId", userController.deleteUser);
userRouter.put("/:userId", userController.updateUser);

export default userRouter;