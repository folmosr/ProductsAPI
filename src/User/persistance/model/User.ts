import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
    
    declare userName: string;
    declare password: string;

    static initModel(sequelize:Sequelize): void {
        User.init(
            {
              userName: {
                type: new DataTypes.STRING(128),
                allowNull: false,
                primaryKey: true
              },
              password: {
                type: new DataTypes.STRING,
                allowNull: false
              },
            },
            {
              tableName: 'users',
              sequelize // passing the `sequelize` instance is required
            }
          );
        }
}