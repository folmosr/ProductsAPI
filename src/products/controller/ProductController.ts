import { Product } from "../persistance/model/Product";
import { IController } from "../../shared/interfaces/IController";
import { IService } from "../../shared/interfaces/IService";
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class ProductController implements IController<Product> {
    private _service: IService<Product>;
    
    /**
     *
     */
    constructor(service:IService<Product>) {
        this._service = service;
    }

    update =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = Number.parseInt(req.params.id, 10);
        if(isNaN(id)) {
            res.status(httpStatus.BAD_REQUEST).send('a valid identifier is needed');
        }
        this._service.update(id, req.body)
        .then(r =>res.status(httpStatus.CREATED).send(`rows affected ${r}`))
        .catch(next);   
    }

    public create =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        this._service.create(req.body)
        .then(r =>res.status(httpStatus.CREATED).send(`resource SKU: ${ r.SKU } and Barcode: ${ r.barcode } has been created with indetifier assigned: ${r.id}`))
        .catch(next);   
    }

    public delete = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
        const id = Number.parseInt(req.params.id, 10);
        if(!isNaN(id)){
            this._service.delete(id)
            .then(r =>res.status(httpStatus.OK).send(`resource ${id} has been deleted`))
            .catch(next);
        } else {
            res.status(httpStatus.BAD_REQUEST).send('a valid identifier is needed');
        }
    }
    
    public getAll = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
        this._service.getAll()
        .then(r =>res.status(httpStatus.OK).send(r))
        .catch(next);
    };

    public getById = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
        const id = Number.parseInt(req.params.id, 10);
        if(!isNaN(id)){
            this._service.getById(id)
            .then(r =>(r) ?  res.status(httpStatus.OK).send(r) : res.status(httpStatus.NOT_FOUND).send('resource has not founded'))
            .catch(next);
        }else{
            res.status(httpStatus.BAD_REQUEST).send('a valid identifier is needed');
        }
    };
}