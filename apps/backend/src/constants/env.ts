import dotenv from "dotenv";
dotenv.config();

const getRequiredEnv = (value:string) => {
    const envVariable = process.env[value];
    if (!envVariable) {
        throw Error(`${value} environment variable not defined`);
    }
    return envVariable;
}

export const env = {
    port:process.env.PORT || 3000,
    corsOrigin:getRequiredEnv("CORS_ORIGIN"),
}