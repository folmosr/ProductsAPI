import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors  from 'cors';
import { WinstonLogger } from '../logger';
import { Routes } from './routes';
import { GlobalErrorHandler } from './middleware/GlobalErrorHandler';
import { ProductRoutes } from './routes/ProductRoutes';
import { DatabaseInstance } from '../../../../persistence/DatabaseInstance';
import { ProductRepository } from '../../../../../products/persistance/ProductRepository';
import { IProductRepository } from '../../../../../products/persistance/interfaces/IProductRepository';
import { IUserRepository } from '../../../../../User/persistance/interfaces/IUserRepository';
import { UserRepository } from '../../../../../User/persistance/UserRepository';
import { UserRoutes } from './routes/UserRoutes';

dotenv.config();

class App {
  public server: Application;
  public log: WinstonLogger = new WinstonLogger();
  private _dbInstance =   DatabaseInstance.getInstance();
  private _productRepo : IProductRepository;
  private _userRepo : IUserRepository;
  private appRoutes: Routes;
  public productRoutes: ProductRoutes;
  public userRoutes: UserRoutes;

  constructor() {
    this._productRepo = new ProductRepository(this._dbInstance, process.env.MODEL_PRODUCT_REFERENCE as string);
    this._userRepo = new UserRepository(this._dbInstance, process.env.MODEL_USER_REFERENCE as string);
    this.appRoutes = new Routes(this._productRepo, this._userRepo);
    this.productRoutes = new ProductRoutes(this._productRepo);
    this.userRoutes = new UserRoutes(this._userRepo);
    this.server = express();
    this.log.initializer();
    this.server.use(express.json());  
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.use('/api/', this.appRoutes.routes());
    this.server.use('/api/products/', this.productRoutes.routes());
    this.server.use('/api/users/', this.userRoutes.routes());
    this.server.use(GlobalErrorHandler);
  }
}

export default new App().server;
