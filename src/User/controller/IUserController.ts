import { NextFunction, Response, Request } from "express";

export interface IUserController {
    run(req: Request, res: Response, next:NextFunction): Promise<void>;
}