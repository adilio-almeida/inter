import { Request, Response, NextFunction, response } from "express";
import AppError from '../shared/error/AppError'

function globalErros(err: Error, req: Request, res: Response, next: NextFunction) {

    if(err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            data: err?.data
        });
    }

    console.log(err);

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}

export {globalErros}