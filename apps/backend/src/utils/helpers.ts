import type { Request, Response, NextFunction } from "express"
import type { ZodError } from "zod";

export const asyncHandler = (fn: any) => async(req: Request, res: Response, next: NextFunction ) => {
    try {
        await fn(req,res,next);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        });
    }
}

export function sendValidationError(res: Response, error: ZodError) {
    return res.status(400).json({
        success: false,
        error: "validation_error",
        issues: error.issues.map((issue)=>({
            path: issue.path.join("."),
            message: issue.message,
            code: issue.code,
        }))
    });
}