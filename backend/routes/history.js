import { Router } from "express";
import historyController from "../controllers/history.js";

const historyRouter = Router();

historyRouter.get("/", historyController.getHistory);

export default historyRouter;