import { Router, type Request, type Response } from "express";
import { adminRouter } from "./admin.route";
import { authRouter } from "./auth.route";

const appRouter = Router();

appRouter.use("/admin",adminRouter);
appRouter.use("/auth",authRouter);
appRouter.use("/spot",authRouter);

appRouter.get("/health",async(req: Request,res: Response) => {
    return res.status(200).json({
        success:true,
        message:"Centralized exchange backend up and running..."
    });
});

export default appRouter;