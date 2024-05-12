import { IRepository } from "../../../shared/persistence/interfaces/IRepository";
import { Product } from "../model/Product";

export interface IProductRepository extends IRepository<Product> {
    seed(): Promise<void>;
    initModel(): Promise<void>;
  }
  