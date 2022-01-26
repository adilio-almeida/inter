import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

import AppError from "../shared/error/AppError";

interface ItokenPlayload {
    firstName: string;
    lastName: string;
    iat: number;
    exp: number;
    sub: string;
}

export default function userAuthentication (req: Request, res: Response, next: NextFunction  ): void {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new AppError('Token não enviado', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = verify(token, authConfig.jwt.secret)
        
        const {sub, firstName, lastName} = decoded as unknown as ItokenPlayload

        req.user = {
            id: sub,
            firstName,
            lastName
        }

        return next()

    } catch {
        throw new AppError('Token inválido ou expirado', 401)
    }
    

}