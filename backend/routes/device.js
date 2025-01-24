import { Router } from "express";
import deviceController from "../controllers/device.js";
import { adminAuthorization } from "../middleware/authCheck.js";

const deviceRouter = Router();

deviceRouter.get("/", adminAuthorization, deviceController.getAllDevices);
deviceRouter.post("/", adminAuthorization, deviceController.insertDevice);
deviceRouter.delete("/:deviceId", adminAuthorization, deviceController.deleteDevice);
deviceRouter.put("/:deviceId", adminAuthorization, deviceController.updateDevice);

export default deviceRouter;