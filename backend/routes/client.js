import { Router } from "express";
import clientController from "../controllers/client.js";
import { adminAuthorization } from "../middleware/authCheck.js";

const clientRouter = Router();

clientRouter.get("/", adminAuthorization, clientController.getClients);
clientRouter.post("/", adminAuthorization, clientController.postClient);
clientRouter.put("/:clientId", adminAuthorization, clientController.putClient);
clientRouter.delete("/:clientId", adminAuthorization, clientController.deleteClient);

export default clientRouter;