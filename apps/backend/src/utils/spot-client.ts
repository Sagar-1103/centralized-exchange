import { env } from "../constants/env";
import { resolveEngineResponse, waitForEngineResponse } from "../store/pending-response";
import { publisher, subscriber } from "./redis";

export enum EngineType {
    ONBOARD,
    CREATE_MARKET
}

export enum OrderSide {
    BUY,
    SELL
}

export type Payload = Record<string,unknown>;

export interface EngineRequest {
    correlationId: string;
    payload: Payload;
    responseQueue: string;
    type: EngineType;
}

export interface EngineResponse {
    correlationId: string;
    data?: unknown;
    error?: string;
    ok: boolean;
}

export const sendToEngine = async(type: EngineType, payload: Payload) => {
    const correlationId = crypto.randomUUID();
    
    const pendingResponse = waitForEngineResponse(correlationId,env.engineTimeoutMs);

    const message: EngineRequest = {
        correlationId,
        payload,
        responseQueue: env.responseQueue,
        type,
    };

    await publisher.xAdd(env.spotIncomingQueue,"*",{
        data: JSON.stringify(message),
    })

    return pendingResponse;
}

export const listenForEngineResponses = async() => {
    for (;;) {
        try {
            const item = await subscriber.xRead({
                key: env.responseQueue,
                id: "$",
            },{
                BLOCK: 0,
                COUNT: 1,
            });

            const response = JSON.parse(item?.[0]?.messages?.[0]?.message.data) as EngineResponse;
      
            if (!response) continue;
            resolveEngineResponse(response);

        } catch (error) {
            console.log("Invalid Response: ",error);
            
        }
    }
}