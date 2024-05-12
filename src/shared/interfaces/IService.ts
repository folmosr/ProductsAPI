export interface IService<T> {
    getAll(): Promise<T[]>;
    getById(id:number): Promise<T>;
    delete(id:number): Promise<void>;
    create(model:T): Promise<T>;
    update(id:number, model:T): Promise<number>;
}