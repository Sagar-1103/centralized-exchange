import type { Request, Response, NextFunction } from "express"

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["admin-token"];

        if (!token) {
            return res.status(401).json({
                success:false,
                error:"Admin token missing"
            });
        }

        next();
    } catch (error) {
        return res.status(403).json({
            success:false,
            error:"Invalid admin token"
        });
    }
}