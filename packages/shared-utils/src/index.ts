import dotenv from "dotenv";
dotenv.config();

export const getRequiredEnv = (value:string) => {
    const envVariable = process.env[value];
    if (!envVariable) {
        throw Error(`${value} environment variable not defined`);
    }
    return envVariable;
}