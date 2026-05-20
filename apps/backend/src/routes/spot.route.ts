import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { cancelOrder, createOrder, fillBalance, getBalance, getDepthBySymbol, getOrderById } from "../controllers/spot.controller";

export const spotRouter = Router();

spotRouter.use(requireAuth);

spotRouter.post("/order",createOrder);
spotRouter.get("/depth/:symbol",getDepthBySymbol);
spotRouter.get("/balance",getBalance);
spotRouter.post("/balance/fill",fillBalance);
spotRouter.get("/order/:orderId",getOrderById);
spotRouter.delete("/order/:orderId",cancelOrder);
