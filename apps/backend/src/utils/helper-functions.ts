import type { Request, Response, NextFunction } from "express";

export const AsyncHandler = (fn:any) => async(req:Request, res:Response, next:NextFunction) => {
    try {
        fn(req,res,next);
    } catch (error) {
        return res.status(500).json({success:false,error});
    }    
}