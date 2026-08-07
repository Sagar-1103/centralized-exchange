import { createClient } from "redis";
import { env } from "./constants/env";

export const subscriber = createClient({url: env.redisUrl}).on("error",(error)=>{
    console.log("Redis subscriber error: ",error);
});

export const publisher = createClient({url: env.redisUrl}).on("error",(error)=>{
    console.log("Redis publisher error: ",error);
});

export enum EngineType {
    ONBOARD,
    CREATE_MARKET
}

export interface EngineRequest {
    correlationId: string;
    payload: Record<string,unknown>;
    responseQueue: string;
    type: EngineType;
}

export interface EngineResponse {
    correlationId: string;
    data?: unknown;
    error?: string;
    ok: boolean;
}

const captureSnapshot = async() => {

}

const restoreEventsFromStream = async() => {

}

const restoreFromLatestSnapshot = async() => {

}

const sendResponse = async(responseQueue: string, response: EngineResponse) => {
    await publisher.xAdd(responseQueue,"*",{
        data: JSON.stringify(response),
    });
}

const handleEngineRequest = (message: EngineRequest) => {
    console.log(message);
    
    return {
        name:"sagar"
    };
}

const startEngine = async() => {
    console.log(`Spot engine listening to ${env.spotIncomingQueue}`);
    for (;;) {
        let message: EngineRequest;
        try {
            let item = await subscriber.xRead({
                key: env.spotIncomingQueue,
                id: "$",
            },{
                BLOCK: 0,
                COUNT: 1,
            });

            if (!item) continue;

            message = JSON.parse(item?.[0]?.messages?.[0]?.message.data) as EngineRequest;
        } catch (error) {
            console.log("Skipping invalid broker message");
            continue;
        }

        try {
            const data = handleEngineRequest(message);
            await sendResponse(message.responseQueue,{
                correlationId: message.correlationId,
                data,
                ok: true,
            });
        } catch (error) {
            console.log("Error while processing engine request: ",error);
            await sendResponse(message.responseQueue,{
                correlationId: message.correlationId,
                ok: false,
                error: error instanceof Error ? error.message : "spot-engine-error", 
            });
        }

    }
}

const main = async() => {
    await Promise.all([subscriber.connect(),publisher.connect()]);
    await restoreFromLatestSnapshot();
    await restoreEventsFromStream();
    await startEngine();
    await captureSnapshot();
}

main();