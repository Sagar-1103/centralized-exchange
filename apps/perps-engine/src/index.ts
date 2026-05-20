import { createClient } from "redis";
import { env } from "./constants/env";
import type { EngineRequest, EngineResponse } from "./store/perps-store";

const brokerClient = createClient({url:env.redisUrl}).on("error",(error) => {
    console.error("Redis broker client error: ", error);
});

const responseClient = createClient({url:env.redisUrl}).on("error",(error)=>{
    console.error("Redis response client error: ", error);
})

await Promise.all([brokerClient.connect(), responseClient.connect()]);

console.log(`Engine listening on Redis queue: ${env.perpsIncomingQueue}`);

const sendResponse = async(responseQueue:string, response:EngineResponse) => {
    await responseClient.lPush(responseQueue,JSON.stringify(response));
}

const handlePerpsEngineRequest = (message:EngineRequest): unknown => {
    return "...";
}

for (;;) {
    let message:EngineRequest;
    try {
        const item = await brokerClient.brPop(env.perpsIncomingQueue,0);
        if (!item) {
            continue;   
        }
        message = JSON.parse(item.element) as EngineRequest;
    } catch (error) {
        console.error("Skipping invalid broker message");
        continue;
    }

    try {
        const data = handlePerpsEngineRequest(message);
        await sendResponse(message.responseQueue,{
            data,
            ok:true,
            correlationId:message.correlationId,
        })
    } catch (error) {
        await sendResponse(message.responseQueue,{
            ok:false,
            correlationId:message.correlationId,
            error: error instanceof Error ? error.message : "perps_engine_error"
        })
    }
}

