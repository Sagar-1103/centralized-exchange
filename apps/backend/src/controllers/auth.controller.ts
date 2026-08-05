import { type NextFunction, type Request, type Response } from "express";
import { asyncHandler, sendValidationError } from "../utils/helpers";
import { authSchema } from "../types/auth-schema";

export const signup = asyncHandler(async(req:Request, res: Response) => {
    const parsedBody = authSchema.safeParse(req.body);

    if (!parsedBody.success) {
        sendValidationError(res,parsedBody.error);
        return;
    }

    const { username, password } = parsedBody.data;
});

export const login = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const parsedBody = authSchema.safeParse(req.body);

    if (!parsedBody.success) {
        sendValidationError(res,parsedBody.error);
        return;
    }

    const { username, password } = parsedBody.data;

});