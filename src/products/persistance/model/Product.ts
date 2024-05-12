import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";


export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    
    declare id: CreationOptional<number>;
    declare handle: string;
    declare title: string;
    declare description: string;
    declare SKU: string;
    declare grams: number;
    declare stock: number;
    declare price: number;
    declare compare_price: number;
    declare barcode: string | null;
    declare image: string | null;

    static initModel(sequelize:Sequelize): void {
        Product.init(
            {
              id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
              },
              handle: {
                type: new DataTypes.STRING(128),
                allowNull: false
              },
              title: {
                type: new DataTypes.STRING(128),
                allowNull: false
              },
              description: {
                type: new DataTypes.TEXT,
                allowNull: true
              },
              SKU: {
                type: new DataTypes.STRING,
                allowNull: false
              },
              grams: {
                type: new DataTypes.INTEGER,
                allowNull: false
              },
              stock: {
                type: new DataTypes.INTEGER,
                allowNull: false
              },
              price: {
                type: new DataTypes.FLOAT,
                allowNull: false
              },
              compare_price: {
                type: new DataTypes.FLOAT,
                allowNull: false
              },
              barcode: {
                type: new DataTypes.STRING,
                allowNull: true
              },
              image: {
                type: new DataTypes.STRING,
                allowNull: true
              }
            },
            {
              tableName: 'products',
              sequelize // passing the `sequelize` instance is required
            }
          );
    }
}