import { Request, Response, NextFunction } from 'express';
export const GlobalErrorHandler = (err:string | Error, req: Request, res: Response, next: NextFunction) => {
    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        default:
            return res.status(500).json({ message: err.message });
    }
}