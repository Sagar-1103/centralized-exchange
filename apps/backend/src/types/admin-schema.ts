import { z } from "zod";

export const createMarketSchema = z.object({
    name: z.string().min(1,{ message: "Market name is required" }),
    symbol: z.string().min(1,{ message: "Market symbol is required" }),
    decimals: z.number().nonnegative(),
});