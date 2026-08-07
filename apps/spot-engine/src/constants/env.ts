import { requiredEnv, optionalEnv } from "@repo/shared";

export const env = {
    redisUrl: requiredEnv("REDIS_URL"),
    spotIncomingQueue: optionalEnv("SPOT_INCOMING_QUEUE","backend-to-spot-engine"),
    totalSnapshots: Number(optionalEnv("TOTAL_SNAPSHOTS","5")),
    backupIntervalMs: Number(optionalEnv("BACKUP_INTERVAL_MS","30000")),
}