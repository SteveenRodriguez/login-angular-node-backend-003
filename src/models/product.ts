import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});
