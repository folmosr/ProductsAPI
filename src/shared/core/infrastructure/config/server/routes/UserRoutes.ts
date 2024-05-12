import { UserService } from "../../../../../../User/service/UserService";
import { IUserController } from "../../../../../../User/controller/IUserController";
import { IUserRepository } from "../../../../../../User/persistance/interfaces/IUserRepository";
import { IUserService } from "../../../../../../User/service/IUserService";
import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../../../../../../User/controller/UserController";
import { ValidateRequest } from "../middleware/ValidateRequest";
import Joi from "joi";


export class UserRoutes {
    public router: Router;
    private _userRepo: IUserRepository;
    private _userService: IUserService;
    private _userController: IUserController;

    /**
     *
     */
    constructor(userRepo: IUserRepository) {  
        this._userRepo = userRepo;
        this._userService = new UserService(this._userRepo);
        this._userController = new UserController(this._userService);      
        this.router = Router();  
    }

    public routes(): Router {
        this._userRepo.initModel();
        this.router.post('/', this.myOwnSchema, this._userController.run);
        return this.router;
    }

    public myOwnSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            userName: Joi.string().required(),
            password: Joi.string().required(),
        });
        ValidateRequest(req, next, schema);
    }
    
}

