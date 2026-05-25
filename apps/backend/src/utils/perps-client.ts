import { env } from "../constants/env";
import { resolveEngineResponse, waitForEngineResponse } from "../store/pending-response";
import { publisher, subscriber } from "./redis-client";

export type EngineType = "create_order";

export interface EngineRequest {
    correlationId:string;
    payload:Record<string,unknown>;
    type:EngineType;
    responseQueue:string;    
}

export interface EngineResponse {
    correlationId:string;
    ok:boolean;
    data?:unknown;
    error?:string;
}

export const sendToEngine = async(type:EngineType,payload:Record<string,unknown>) => {
    const correlationId = crypto.randomUUID();
    const pendingResponse = waitForEngineResponse(correlationId,env.engineTimeoutMs);

    const message:EngineRequest = {
        correlationId,
        type,
        responseQueue:env.responseQueue,
        payload,
    };

    await publisher.xAdd(env.perpsIncomingQueue,"*",{
        data: JSON.stringify(message)
    });

    return pendingResponse;
}

export const listenForEngineResponses = async () => {
    console.log(`Listening for engine responses on ${env.responseQueue}`);
    
    for(;;) {
        try {
            const item = await subscriber.xRead({
                key: env.responseQueue,
                id: "$"
            },{
                BLOCK: 0,
                COUNT: 1
            })
            //@ts-ignore
            console.log(JSON.parse(item?.[0]?.messages?.[0]?.message.data));
            //@ts-ignore
            const response = JSON.parse(item?.[0]?.messages?.[0]?.message.data) as EngineResponse;
            
            if (!response) continue;

            resolveEngineResponse(response);
        } catch (error) {
            console.error("Invalid Response: ",error);
        }
    }
}