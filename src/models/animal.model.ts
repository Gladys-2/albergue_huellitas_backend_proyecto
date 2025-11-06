import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import Refugio from "./refugio.model";

const Animal = sequelize.define("Animal", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  especie: DataTypes.STRING,
  estado: DataTypes.STRING,
  foto: DataTypes.STRING,
  refugio_id: { type: DataTypes.INTEGER, references: { model: Refugio, key: "id" } }
}, { timestamps: false });

Animal.belongsTo(Refugio, { foreignKey: "refugio_id" });

export default Animal;