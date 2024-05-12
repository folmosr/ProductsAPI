import { Dialect, Sequelize } from "sequelize";

export class DatabaseInstance {
  private static _instance: DatabaseInstance;
  _client!: Sequelize;
  /**
   *
   */
  constructor() {}

  public static getInstance(): DatabaseInstance {
    if (!DatabaseInstance._instance) {
      DatabaseInstance._instance = new DatabaseInstance();
      DatabaseInstance._instance._client = new Sequelize(`${process.env.DB_NAME as string}`, `${process.env.DB_USER as string}`,`${process.env.DB_PASSWORD as string}`, {
        host: `${process.env.HOST_NAME as string}`,
        dialect:`${process.env.DIALECT as Dialect}`,
      });
    }
    DatabaseInstance.testConnection();
    return DatabaseInstance._instance;
  }

  public static testConnection(): void {
    DatabaseInstance._instance._client.authenticate()
    .then(_=> log.info(`Test connection successfull!`))
    .catch(error=>log.error(`an error has been throw while connecting`, error));
  }
}
