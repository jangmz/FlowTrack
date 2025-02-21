import { Router } from "express";
import clientController from "../controllers/client.js";
import { adminAuthorization } from "../middleware/authCheck.js";
import multer from "multer";

const clientRouter = Router();
const upload = multer({ dest: "uploads/" }); // folder for temporary uploaded files

clientRouter.get("/", adminAuthorization, clientController.getClients);
clientRouter.post("/", adminAuthorization, clientController.postClient);
clientRouter.put("/:clientId", adminAuthorization, clientController.putClient);
clientRouter.delete("/:clientId", adminAuthorization, clientController.deleteClient);
clientRouter.post("/import", adminAuthorization, upload.single("file"), clientController.importClients);
clientRouter.get("/export", adminAuthorization, clientController.exportClients);

export default clientRouter;