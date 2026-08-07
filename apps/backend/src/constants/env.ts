import { optionalEnv, requiredEnv } from "@repo/shared";

export const env = {
  port: Number(optionalEnv("PORT","3001")),
  corsOrigin: requiredEnv("CORS_ORIGIN"),
  jwtSecret: requiredEnv("JWT_SECRET"),
  adminToken: requiredEnv("ADMIN_TOKEN"),
  redisUrl: requiredEnv("REDIS_URL"),
  spotIncomingQueue: optionalEnv("SPOT_INCOMING_QUEUE","backend-to-spot-engine"),
  responseQueue: optionalEnv("BACKEND_QUEUE_ID",crypto.randomUUID()),
  engineTimeoutMs: Number(optionalEnv("ENGINE_TIMEOUT_MS","30000")),
}