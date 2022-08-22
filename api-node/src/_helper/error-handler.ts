import { Response, NextFunction, ErrorRequestHandler } from "express";

export class HttpException extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
   
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    return res.status(status).send(message)
}