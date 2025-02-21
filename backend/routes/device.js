import { Router } from "express";
import deviceController from "../controllers/device.js";
import { adminAuthorization } from "../middleware/authCheck.js";
import multer from "multer";

const deviceRouter = Router();
const upload = multer({ dest: "uploads/" }); // folder for uploaded files

deviceRouter.get("/", adminAuthorization, deviceController.getAllDevices);
deviceRouter.post("/", adminAuthorization, deviceController.insertDevice);
deviceRouter.delete("/:deviceId", adminAuthorization, deviceController.deleteDevice);
deviceRouter.put("/:deviceId", adminAuthorization, deviceController.updateDevice);
deviceRouter.post("/import", adminAuthorization, upload.single("file"), deviceController.importDevices);
deviceRouter.get("/export", adminAuthorization,  deviceController.exportDevices);

export default deviceRouter;