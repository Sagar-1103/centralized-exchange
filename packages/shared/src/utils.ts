import dotenv from "dotenv";
dotenv.config();

export const requiredEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment Variable [${key}] not defined`);
  }
  return value;
}

export const optionalEnv = (key: string, defaultValue: string) => {
  const value = process.env[key];
  return value ?? defaultValue;
}

export const getScale = (decimals: number) => {
  return 10n * BigInt(decimals);
}