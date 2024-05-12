import { Sequelize } from 'sequelize';
import { IDatabaseContext } from './IDatabaseContext';
import { DatabaseInstance } from './DatabaseInstance';

export class DatabaseContext implements IDatabaseContext {

  _dbInstance: Readonly<DatabaseInstance>;

  /**
   *
   */
  constructor(
    dbInstance: DatabaseInstance
  ) {
    this._dbInstance = dbInstance;
  }
}
