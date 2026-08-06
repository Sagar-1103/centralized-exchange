import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { onRampUsd } from "../controllers/spot.controller";

export const spotRouter = Router();

spotRouter.use(isAuthenticated);

spotRouter.post("/balance",onRampUsd);