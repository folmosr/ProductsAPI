import { Optional } from 'sequelize';
import { IEntity } from './IEntity';

export interface IRepository<T> {
  getById(id: number): Promise<T>;
  getAll(): Promise<Array<T>>;
  delete(id: number): Promise<void>;
  create(model: T & Optional<any, string> | undefined): Promise<T>;
  update(model: T & IEntity & Omit<any, string> & Partial<Pick<any, string>>): Promise<number>;
}
