import { Router } from "express";
import historyController from "../controllers/history.js";

const historyRouter = Router();

historyRouter.get("/", historyController.getHistory);
historyRouter.post("/", historyController.insertHistory);
historyRouter.delete("/:historyId", historyController.deleteHistory);

export default historyRouter;