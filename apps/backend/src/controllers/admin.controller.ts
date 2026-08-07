import type { Request, Response } from "express";
import { asyncHandler, sendValidationError } from "../utils/helpers";
import { createMarketSchema } from "../types/admin-schema";
import { prisma } from "@repo/db/client";
import { EngineType, sendToEngine } from "../utils/spot-client";

export const createMarket = asyncHandler(async(req: Request,res: Response) => {
    const parsedBody = createMarketSchema.safeParse(req.body);

    if (!parsedBody.success) {
        sendValidationError(res,parsedBody.error);
        return;
    }

    const { name, symbol, decimals } = parsedBody.data;

    const existingMarket = await prisma.market.findUnique({
        where: {
            name,
            symbol: symbol.toUpperCase(),
        },
    });
    
    if (existingMarket) {
        return res.status(401).json({
            success: false,
            error: "Market already exists",
        });
    }

    await prisma.market.create({
        data: {
            name,
            symbol: symbol.toUpperCase(),
            decimals,
        },
    });

    const engineResponse = await sendToEngine(EngineType.CREATE_MARKET,{
        name,
        decimals,
        symbol: symbol.toUpperCase()
    });

    return res.status(201).json({
        success: engineResponse.ok,
        data: engineResponse.data,
        error: engineResponse.error,
    });
});