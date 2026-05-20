import { createClient } from "redis";
import { env } from "./constants/env";
import type { EngineRequest, EngineResponse } from "./store/spot-store";

const brokerClient = createClient({url:env.redisUrl}).on("error",(error)=>{
    console.error("Redis broker client error: ",error);
})

const responseClient = createClient({url:env.redisUrl}).on("error",(error)=>{
    console.error("Redis response client error: ",error);
})

const sendResponse = async(responseQueue:string,response:EngineResponse) => {
    await responseClient.lPush(responseQueue,JSON.stringify(response));
}

const handleSpotEngineRequest = (message:EngineRequest): unknown => {
    return "...";
}

for(;;) {
    let message: EngineRequest;
    try {
        const item = await brokerClient.brPop(env.spotIncomingQueue,0);
        if (!item) {
            continue;
        }
        message = JSON.parse(item.element) as EngineRequest;
    } catch (error) {
        console.error("Skipping invalid broker message");
        continue;
    }

    try {
        const data = handleSpotEngineRequest(message);
        await sendResponse(message.responseQueue,{
            correlationId:message.correlationId,
            ok:true,
            data,
        });
    } catch (error) {
        await sendResponse(message.responseQueue,{
            correlationId:message.correlationId,
            ok:false,
            error: error instanceof Error? error.message : "spot_engine_error"
        })
    }
}