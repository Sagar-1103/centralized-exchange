import type { Request, Response } from "express";
import { AsyncHandler } from "../utils/helper-functions";

export const signup = AsyncHandler(async(req:Request, res:Response)=>{
    return res.status(201).json({success:true,message:"User registered successfully",token:"sadf"});
})

export const signin = AsyncHandler(async(req:Request, res:Response)=>{
    return res.status(201).json({success:true,message:"User logged in successfully",token:"sadf"});
})