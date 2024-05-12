import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { IProductRepository } from '../products/persistance/interfaces/IProductRepository';
import { IUserRepository } from '../User/persistance/interfaces/IUserRepository';

export class SeedDataBase {
    private _productRepo: IProductRepository;
    private _userRepo: IUserRepository;
    /**
     *
     */
    constructor(productRepo:IProductRepository, userRepo : IUserRepository) {
        this._productRepo = productRepo;
        this._userRepo = userRepo;
    }

  run = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    try{
        await this._productRepo.seed();
        await this._userRepo.seed();
        res.status(httpStatus.OK).send(`Tables Product and Users has been created and loaded`)
    }catch(error){
        next(error);
    }
    
      
  };
}
