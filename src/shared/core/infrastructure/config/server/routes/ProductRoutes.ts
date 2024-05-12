import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import { ProductController } from "../../../../../../products/controller/ProductController";
import { IProductRepository } from "../../../../../../products/persistance/interfaces/IProductRepository";
import { ProductService } from "../../../../../../products/service/ProductService";
import { ValidateRequest } from "../middleware/ValidateRequest";
import { IService } from "../../../../../interfaces/IService";
import { IController } from "../../../../../interfaces/IController";
import { Product } from "../../../../../../products/persistance/model/Product";




export class ProductRoutes {
    public router: Router;
    private _productRepo: IProductRepository;
    private _productService: IService<Product>;
    private _productController: IController<Product>;

    /**
     *
     */
    constructor(productRepo: IProductRepository) {  
        this._productRepo = productRepo;
        this._productService = new ProductService(this._productRepo);
        this._productController = new ProductController(this._productService);      
        this.router = Router();  
    }

    public routes(): Router {
        this._productRepo.initModel();
        this.router.get('/', this._productController.getAll);
        this.router.get('/:id', this._productController.getById);
        this.router.post('/', this.myOwnSchema, this._productController.create);
        this.router.put('/:id', this.myOwnSchema, this._productController.update);
        this.router.delete('/:id', this._productController.delete);
        return this.router;
    }

    public myOwnSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            handle: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            SKU: Joi.string().required(),
            grams: Joi.number().required(),
            stock: Joi.number().required(),
            price: Joi.number().required(),
            compare_price: Joi.number().required(),
            barcode: Joi.string().optional(),
            image: Joi.string().optional(),
        });
        ValidateRequest(req, next, schema);
    }
    
}

