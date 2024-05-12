import { Product } from "../persistance/model/Product";
import { IService } from "../../shared/interfaces/IService";
import { IProductRepository } from "../persistance/interfaces/IProductRepository";

export class ProductService implements IService<Product> {
    private _repo: IProductRepository;
    /**
     *
     */
    constructor(repo: IProductRepository) {
        this._repo = repo;
    }

    async update(id: number, model: Product  & Omit<any, string>): Promise<number> {
        const product = await this._repo.getById(id);
        if(!product) {
            throw `resource ${id} has not been founded`;
        }
        model.id = id;
        log.info(`resouirce to be updated`, model);
        return this._repo.update(model);
    }
    
    create(model: Product & Omit<any, string>): Promise<Product> {
       return this._repo.create(model);
    }

    delete(id: number): Promise<void> {
       return this._repo.delete(id);
    }
    getById(id: number): Promise<Product> {
       return this._repo.getById(id);
    }

    public getAll(): Promise<Product[]> {
        return this._repo.getAll();
    }

}