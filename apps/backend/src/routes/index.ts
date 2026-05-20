import { Router } from "express";
import { authRouter } from "./auth.route";
import { perpRouter } from "./perp.route";
import { spotRouter } from "./spot.route";

const appRouter = Router();

appRouter.use("/auth",authRouter);
appRouter.use("/spot",spotRouter);
appRouter.use("/perps",perpRouter);

export default appRouter;