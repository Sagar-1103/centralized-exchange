import { Router, type Request, type Response } from "express";
import { adminRouter } from "./admin.route";
import { authRouter } from "./auth.route";
import { pingRedis } from "../utils/redis";
import { spotRouter } from "./spot.route";

const appRouter = Router();

appRouter.use("/admin",adminRouter);
appRouter.use("/auth",authRouter);
appRouter.use("/spot",spotRouter);

appRouter.get("/health",async(req: Request,res: Response) => {
    await pingRedis();
    return res.status(200).json({
        success:true,
    });
});

export default appRouter;