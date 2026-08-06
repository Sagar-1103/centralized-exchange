import type { Request, Response } from "express";
import { asyncHandler, sendValidationError } from "../utils/helpers";
import { createMarketSchema } from "../types/admin-schema";
import { prisma } from "@repo/db/client";

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
            symbol,
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
            symbol,
            decimals,
        },
    });

    //Todo: send event in stream to be picked by the engine to initialize orderbook

    return res.status(201).json({
        success: true,
        message: "Market created successfully",
        name,
        symbol,
    });
});