import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(optionalEnv("PORT","3001")),
  corsOrigin: requriedEnv("CORS_ORIGIN"),
  jwtSecret: requriedEnv("JWT_SECRET"),
  adminToken: requriedEnv("ADMIN_TOKEN"),
  redisUrl: requriedEnv("REDIS_URL")
}

function requriedEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment Variable [${key}] not defined`);
  }
  return value;
}

function optionalEnv(key: string, defaultValue: string) {
  const value = process.env[key];
  return value ?? defaultValue;
}