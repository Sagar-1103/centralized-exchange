import express, { type Express, type Request, type Response } from "express";
import { env } from "./constants/env";
import cors from "cors";
import appRouter from "./routes";
import { connectRedis, pingRedis } from "./utils/redis-client";
import { listenForEngineResponses } from "./utils/perps-client";

const app: Express = express();
const port = env.port;

app.use(express.json());
app.use(cors({
    origin:env.corsOrigin,
}));

await connectRedis();
listenForEngineResponses();

app.get("/api/health",async(req:Request,res:Response) => {
    await pingRedis();
    return res.status(200).json({success:true});
});

app.use("/api",appRouter);

app.listen(port,()=>{
    console.log(`CEX backend running on http://localhost:${port}`);
});
