import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import User from "./user.model";
import Animal from "./animal.model";

const Adopcion = sequelize.define("Adopcion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  animal_id: { type: DataTypes.INTEGER, references: { model: Animal, key: "id" } },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  estado: DataTypes.STRING
}, { timestamps: false });

Adopcion.belongsTo(User, { foreignKey: "usuario_id" });
Adopcion.belongsTo(Animal, { foreignKey: "animal_id" });

export default Adopcion;