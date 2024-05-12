import Model from 'sequelize/types/model';
import { IRepository } from './interfaces/IRepository';
import { DatabaseInstance } from './DatabaseInstance';
import { Optional } from 'sequelize';
import { IEntity } from './interfaces/IEntity';

export class Repository<T extends Model<any, any>> implements IRepository<T> {
  protected _database: Readonly<DatabaseInstance>;
  private _modelName : string;

  constructor(database: DatabaseInstance, reference: string) {
    this._database = database;
    this._modelName = reference;
  }

  update(model: T & IEntity & Omit<any, string> & Partial<Pick<any, string>>): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this._database._client.models[this._modelName]
      .update(model, { where: {
        id: model.id,
      }})
      .then(([affected]) => {
        return resolve(affected);
      })
      .catch((err: unknown) => {
        if (err) {
          reject(err);
        }
      });
    });
  }
  
  create(model: T & Optional<any, string> | undefined): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._database._client.models[this._modelName]
      .create(model)
      .then(row => {
        const response: T = <T>(<unknown>row);
        return resolve(response);
      })
      .catch((err: unknown) => {
        if (err) {
          reject(err);
        }
      });
    });
  }

  delete(id: number): Promise<void> {
     return new Promise<void>((resolve, reject) => {
      this._database._client.models[this._modelName]
      .findByPk(id)
      .then(row => row?.destroy())
      .then(_=> {
        return resolve();
      })
      .catch((err: unknown) => {
        if (err) {
          reject(err);
        }
      });
    });
  }

  public getById(id: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._database._client.models[this._modelName]
      .findByPk(id)
      .then((row) => {
        const response: T = <T>(<unknown>row);
        return resolve(response);
      })
      .catch((err: unknown) => {
        if (err) {
          reject(err);
        }
      });
    });
  }

  public getAll(): Promise<Array<T>> {
    return new Promise<T[]>((resolve, reject) => {
      this._database._client.models[this._modelName]
      .findAll()
      .then((rows: Model<any, any>[]) => {
        const response: T[] = [];
        rows.forEach((row) => {
          response.push(<T>(<unknown>row));
        });
        return resolve(response);
      })
      .catch((err: unknown) => {
        if (err) {
          reject(err);
        }
      });
    });
  }
}
