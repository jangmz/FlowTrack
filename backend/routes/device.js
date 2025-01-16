import { Router } from "express";
import deviceController from "../controllers/device.js";

const deviceRouter = Router();

deviceRouter.get("/", deviceController.getDevices);

export default deviceRouter;