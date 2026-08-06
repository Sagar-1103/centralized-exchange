import type { Request, Response } from "express";
import { asyncHandler, sendValidationError } from "../utils/helpers";
import { onRampUsdSchema } from "../types/spot-schema";

export const onRampUsd = asyncHandler(async(req: Request, res: Response) => {
    const parsedBody = onRampUsdSchema.safeParse(req.body);

    if (!parsedBody.success) {
        sendValidationError(res,parsedBody.error);
        return;
    }

    const { amount } = parsedBody.data;

    // send event to stream to be picked by the engine to add funds to the users balance

    return res.status(201).json({
        success: true,
        message: "User balance updated",
        balance: 0,
    });
});