import { Request, Response, NextFunction } from "express";
import { IUserController } from "./IUserController";
import { IUserService } from "../service/IUserService";
import httpStatus from "http-status";

export class UserController implements IUserController {
    private _service: IUserService;
    /**
     *
     */
    constructor(service: IUserService) {
        this._service = service;
    }

    run = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        this._service.run(req.body)
       .then(r => r ? res.status(httpStatus.OK).send(`user founded`) : res.status(httpStatus.NOT_FOUND).send(`user does not exist`))
       .catch(next);   
    }

}