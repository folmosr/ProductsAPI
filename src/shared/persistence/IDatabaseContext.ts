import Sequelize from "sequelize/types/sequelize";
import { DatabaseInstance } from "./DatabaseInstance";

export interface IDatabaseContext {
  _dbInstance: Readonly<DatabaseInstance>;
}
