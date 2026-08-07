import { createClient } from "redis";
import { env } from "../constants/env";
import type { EngineResponse } from "../store/spot";

export const subscriber = createClient({url: env.redisUrl}).on("error",(error)=>{
    console.log("Redis subscriber error: ",error);
});

export const publisher = createClient({url: env.redisUrl}).on("error",(error)=>{
    console.log("Redis publisher error: ",error);
});

export const connectRedis = async() => {
    await Promise.all([subscriber.connect(),publisher.connect()]);
}

export const sendResponse = async(responseQueue: string, response: EngineResponse) => {
    await publisher.xAdd(responseQueue,"*",{
        data: JSON.stringify(response),
    });
}

export const readFromStream = async() => {
    const item = await subscriber.xRead({
        key: env.spotIncomingQueue,
        id: "$",
    },{
        BLOCK: 0,
        COUNT: 1,
    });
    return item;
}