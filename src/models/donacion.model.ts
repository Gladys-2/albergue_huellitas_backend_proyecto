import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import User from "./user.model";

const Donacion = sequelize.define("Donacion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" }, allowNull: false },
  monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  tipo: DataTypes.STRING,
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

Donacion.belongsTo(User, { foreignKey: "usuario_id", onDelete: "CASCADE" });

export default Donacion;