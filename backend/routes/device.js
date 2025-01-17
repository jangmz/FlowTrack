import { Router } from "express";
import deviceController from "../controllers/device.js";

const deviceRouter = Router();

deviceRouter.get("/", deviceController.getAllDevices);
deviceRouter.post("/", deviceController.insertDevice);
deviceRouter.delete("/:deviceId", deviceController.deleteDevice);
deviceRouter.put("/:deviceId", deviceController.updateDevice);

export default deviceRouter;