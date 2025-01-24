import { Router } from "express";
import userController from "../controllers/user.js";
import { adminAuthorization } from "../middleware/authCheck.js";

const userRouter = Router();

userRouter.get("/", adminAuthorization, userController.getUsers);
userRouter.post("/", adminAuthorization, userController.insertUser);
userRouter.delete("/:userId", adminAuthorization, userController.deleteUser);
userRouter.put("/:userId", adminAuthorization, userController.updateUser);

export default userRouter;