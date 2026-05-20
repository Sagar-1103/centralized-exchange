import type { Request, Response } from "express"
import { AsyncHandler, getUserId } from "../utils/helper-functions"
import { sendToEngine } from "../utils/perps-client";

export const onRamp = AsyncHandler(async(req:Request,res:Response) => {
    return res.status(200).json({success:true});
})

export const createOrder = AsyncHandler(async(req:Request,res:Response) => {
    const userId = getUserId(req,res);

    const engineResponse = await sendToEngine("create_order",{
        userId,
    });

    return res.status(engineResponse.ok?201:400).json({success:engineResponse.ok,data:engineResponse.data,error:engineResponse.error});
})

export const cancelOrder = AsyncHandler(async(req:Request,res:Response) => {
    return res.status(200).json({success:true});
})

export const getFills = AsyncHandler(async(req:Request,res:Response) => {
    return res.status(200).json({success:true});
})

export const getOrdersByMarketId = AsyncHandler(async(req:Request,res:Response) => {
    return res.status(200).json({success:true});
})

export const getOpenOrdersByMarketId = AsyncHandler(async(req:Request,res:Response) => {
    return res.status(200).json({success:true});
})

export const getAvailableEquity = AsyncHandler(async(req:Request,res:Response) => {
    return res.status(200).json({success:true});
})

export const getOpenPositionByMarketId = AsyncHandler(async(req:Request,res:Response) => {
    return res.status(200).json({success:true});
})

export const getClosedPositionByMarketId = AsyncHandler(async(req:Request,res:Response) => {
    return res.status(200).json({success:true});
})
