import { type NextFunction, type Request, type Response } from "express";
import { asyncHandler, sendValidationError } from "../utils/helpers";
import { authSchema } from "../types/auth-schema";
import { prisma } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { env } from "../constants/env";
import bcrypt from "bcryptjs";
import { EngineType, sendToEngine } from "../utils/spot-client";

const generateToken = (userId: string) => {
    return jwt.sign({id: userId},env.jwtSecret);
}

export const signup = asyncHandler(async(req:Request, res: Response) => {
    const parsedBody = authSchema.safeParse(req.body);

    if (!parsedBody.success) {
        sendValidationError(res,parsedBody.error);
        return;
    }

    const { username, password } = parsedBody.data;

    const existingUser = await prisma.user.findUnique({
        where:{
            username,
        },
    });

    if (existingUser) {
        return res.status(401).json({
            success: false,
            error: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password,10); 

    const user = await prisma.user.create({
        data:{
            username,
            hashedPassword,
        },
    });

    const token = generateToken(user.id);

    const engineResponse = await sendToEngine(EngineType.ONBOARD,{
        userId: user.id,
        amount: 0,
    });

    return res.status(201).json({
        success: engineResponse.ok,
        error: engineResponse.error,
        message: engineResponse.ok ? "User registered successfully" : undefined,
        token,
    });
});

export const login = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const parsedBody = authSchema.safeParse(req.body);

    if (!parsedBody.success) {
        sendValidationError(res,parsedBody.error);
        return;
    }

    const { username, password } = parsedBody.data;

    const user = await prisma.user.findUnique({
        where:{
            username,
        },
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "User doesnt exist",
        });
    }

    const isPasswordValid = await bcrypt.compare(password,user.hashedPassword);

    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            error: "Invalid credentials",
        });
    }

    const token = generateToken(user.id);
    return res.status(201).json({
        success: true,
        message: "User logged in successfully",
        token
    });
});