import { Router } from 'express';

import { VersionHealth } from '../../../../../../version';
import { SeedDataBase } from '../../../../../../seeder';
import { IProductRepository } from '../../../../../../products/persistance/interfaces/IProductRepository';
import { IUserRepository } from '../../../../../../User/persistance/interfaces/IUserRepository';

export class Routes {
  public router: Router;
  private _versionHealth: VersionHealth;

  private _seeder: SeedDataBase;
  private _productRepo: IProductRepository;
  private _userRepo: IUserRepository;

  constructor(productRepo: IProductRepository, userRepo: IUserRepository) {
    this._userRepo = userRepo;
    this._productRepo = productRepo;
    this.router = Router();   
    this._versionHealth = new VersionHealth();
    this._seeder = new SeedDataBase(this._productRepo, this._userRepo);
  }

  public routes(): Router {
    this.router.get('/health', this._versionHealth.run);
    this.router.get('/seed', this._seeder.run);
    return this.router;
  }
}
