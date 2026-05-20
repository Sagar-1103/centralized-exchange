import type { Request, Response } from "express";
import { AsyncHandler } from "../utils/helper-functions";

export const createOrder = AsyncHandler(async(req:Request, res:Response) => {
    return res.status(200).json({success:true});
})

export const getDepthBySymbol = AsyncHandler(async(req:Request, res:Response) => {
    return res.status(200).json({success:true});
})

export const getBalance = AsyncHandler(async(req:Request, res:Response) => {
    return res.status(200).json({success:true});
})

export const fillBalance = AsyncHandler(async(req:Request, res:Response) => {
    return res.status(200).json({success:true});
})

export const getOrderById = AsyncHandler(async(req:Request, res:Response) => {
    return res.status(200).json({success:true});
})

export const cancelOrder = AsyncHandler(async(req:Request, res:Response) => {
    return res.status(200).json({success:true});
})