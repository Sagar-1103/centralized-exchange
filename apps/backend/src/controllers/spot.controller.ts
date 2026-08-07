import type { Request, Response } from "express";
import { asyncHandler, sendValidationError } from "../utils/helpers";
import { onRampUsdSchema } from "../types/spot-schema";
import { EngineType, sendToEngine } from "../utils/spot-client";

export const onRampUsd = asyncHandler(async(req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(403).json({
            success: false,
            error: "User id not defined",
        });
    }
    const parsedBody = onRampUsdSchema.safeParse(req.body);

    if (!parsedBody.success) {
        sendValidationError(res,parsedBody.error);
        return;
    }

    const { amount } = parsedBody.data;

    const engineResponse = await sendToEngine(EngineType.ONBOARD,{
        userId,
        amount,
    })

    return res.status(201).json({
        success: engineResponse.ok,
        error: engineResponse.error,
        data: engineResponse.data
    });
});