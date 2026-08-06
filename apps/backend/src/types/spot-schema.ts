import { z } from "zod";

export const onRampUsdSchema = z.object({
    amount: z.number().positive(),
})