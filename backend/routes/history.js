import { Router } from "express";
import historyController from "../controllers/history.js";
import { adminAuthorization } from "../middleware/authCheck.js";

const historyRouter = Router();

historyRouter.get("/", adminAuthorization, historyController.getHistory);
historyRouter.post("/", adminAuthorization, historyController.insertHistory);
historyRouter.delete("/:historyId", adminAuthorization, historyController.deleteHistory);

export default historyRouter;