import { requiredEnv, optionalEnv } from "@repo/shared";

export const env = {
    redisUrl: requiredEnv("REDIS_URL"),
    spotIncomingQueue: optionalEnv("SPOT_INCOMING_QUEUE","backend-to-spot-engine"),
    totalSnapshots: Number(optionalEnv("TOTAL_SNAPSHOTS","5")),
    backupIntervalMs: Number(optionalEnv("BACKUP_INTERVAL_MS","900000")),
    prefix: optionalEnv("PREFIX","spot-engine-snapshots/"),
    accessKeyId: requiredEnv("ACCESS_KEY_ID"),
    secretAccessKey: requiredEnv("SECRET_ACCESS_KEY"),
    bucket: requiredEnv("BUCKET"),
    region: requiredEnv("REGION"),
    endpoint: requiredEnv("ENDPOINT"),
}