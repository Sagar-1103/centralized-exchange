import { getRequiredEnv } from "@repo/shared-utils";

export const env = {
    redisUrl:getRequiredEnv("REDIS_URL"),
    perpsIncomingQueue:process.env.PERPS_INCOMING_QUEUE || "backend-to-perps-engine",
    awsBucketName:getRequiredEnv("AWS_BUCKET_NAME"),
    awsRegion:getRequiredEnv("AWS_REGION"),
    awsAccessKeyId:getRequiredEnv("AWS_ACCESS_KEY_ID"),
    awsSecretAccessKey:getRequiredEnv("AWS_SECRET_ACCESS_KEY"),
    totalSnapshots: parseInt(process.env.TOTAL_SNAPSHOTS || "5"),
    backupIntervalMs: parseInt(process.env.BACKUP_INTERVAL_MS || "30000"),
}