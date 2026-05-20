import { createClient } from "redis";
import { env } from "../constants/env";

export const subscriber = createClient({url:env.redisUrl}).on("error",(error)=>{
    console.error("Redis subcriber error: ",error);
})

export const publisher = createClient({url:env.redisUrl}).on("error",(error)=>{
    console.error("Redis publisher error: ", error);
})

export const connectRedis = async() => {
    await Promise.all([subscriber.connect(),publisher.connect()]);
}

export const pingRedis = () => {
    return publisher.ping();
}