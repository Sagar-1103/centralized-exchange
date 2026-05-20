import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { env } from "../constants/env";

declare global {
    namespace Express {
        interface Request {
            userId?:string;
        }
    }
}

interface Payload {
    userId:string;
}

export const requireAuth = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers?.["authorization"]?.replace("Bearer ","");
        if (!token) {
            return res.status(401).json({success:false,message:"Auth token required"});
        }

        const payload = jwt.verify(token,env.jwtSecret) as Payload;
        
        req.userId = payload.userId;

        next();
    } catch (error) {
        return res.status(409).json({success:false,message:"Invalid token"});
    }
}