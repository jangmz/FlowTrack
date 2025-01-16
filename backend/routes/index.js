import { Router } from "express";
import userRouter from "./user.js";
import deviceRouter from "./device.js";
import historyRouter from "./history.js";
import indexController from "../controllers/index.js";

const indexRouter = Router();

indexRouter.get("/", indexController.getIndex);

export default {
    userRouter,
    deviceRouter,
    historyRouter,
    indexRouter
}