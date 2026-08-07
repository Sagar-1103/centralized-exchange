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

export const getBalance = asyncHandler(async(req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(403).json({
            success: false,
            error: "User id not defined",
        });
    }

    const engineResponse = await sendToEngine(EngineType.GET_BALANCE, {
        userId,
    });

    return res.status(200).json({
        success: engineResponse.ok,
        error: engineResponse.error,
        data: engineResponse.data,
    });
});

export const getDepth = asyncHandler(async(req: Request, res: Response) => {
    const symbol = req.params.symbol;

    if (!symbol) {
        return res.status(401).json({
            success: false,
            error: "Symbol is required",
        });
    }

    const engineResponse = await sendToEngine(EngineType.GET_DEPTH, {
        symbol,
    });

    return res.status(200).json({
        success: engineResponse.ok,
        error: engineResponse.error,
        data: engineResponse.data,
    });
});

export const createOrder = asyncHandler(async(req: Request, res: Response) => {
    
    const engineResponse = await sendToEngine(EngineType.CREATE_ORDER, {
        
    });

    return res.status(200).json({
        success: engineResponse.ok,
        error: engineResponse.error,
        data: engineResponse.data,
    });
});