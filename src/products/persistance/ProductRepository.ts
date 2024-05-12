import { Repository } from "../../shared/persistence/Repository";
import { IProductRepository } from "./interfaces/IProductRepository";
import { Product } from "./model/Product";
import rawList from "./seed/product.json"

type productType = {
    handle: string;
    title: string;
    description: string;
    SKU: string;
    grams: number;
    stock: number;
    price: number;
    compare_price: number;
    barcode: string | null;
};
export class ProductRepository extends Repository<Product>
implements IProductRepository {
  
    async seed() {
            const endedList:productType[] = rawList.map(x=> ({
                handle : x.handle,
                title : x.title,
                description : x.description,
                SKU: x.SKU.toString(),
                grams: Number.parseInt(x.grams) ?? 0,
                stock: Number.parseInt(x.stock.toString()) ?? 0,
                price: Number.parseFloat(x.price.toString()) ?? 0,
                compare_price: Number.parseFloat(x.compare_price.toString()) ?? 0,
                barcode: x.barcode? x.barcode.toString() : null,
            }));
           Product.initModel(this._database._client);
           await Product.sync();
           await Promise.all(endedList.map(p=> Product.create(p)));
    }
    
    async initModel(): Promise<void> {
        Product.initModel(this._database._client);
    }

}