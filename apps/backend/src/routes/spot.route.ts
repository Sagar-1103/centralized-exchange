import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { createOrder, getBalance, getDepth, onRampUsd } from "../controllers/spot.controller";

export const spotRouter = Router();

spotRouter.get("/:symbol",getDepth);

spotRouter.use(isAuthenticated);

spotRouter.route("/balance").get(getBalance).post(onRampUsd);
spotRouter.post("/order",createOrder);