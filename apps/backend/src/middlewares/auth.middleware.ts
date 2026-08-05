import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { env } from "../constants/env";
import type { isExpression } from "typescript";

declare global {
    namespace Express {
        interface Request {
            userId?:string;
        }
    }
}

export const requireAuth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.split("Bearer ")?.[1];

        if (!token) {
            return res.status(401).json({
                success:false,
                error:"Invalid Token"
            });
        }

        const decoded = jwt.verify(token,env.jwtSecret) as { id: string };

        if (!decoded) {
            return res.status(403).json({
                success:false,
                error:"Invalid Token"
            });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({success:false,error:"Auth token missing"});
    }
}