import { getRequiredEnv } from "@repo/shared-utils";

export const env = {
    redisUrl: getRequiredEnv("REDIS_URL"),
    binanceWebsocketUrl: getRequiredEnv("BINANCE_WS_URL"),
}