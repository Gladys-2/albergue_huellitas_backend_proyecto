import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import Refugio from "./refugio.model";

const Voluntario = sequelize.define("Voluntario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  telefono: DataTypes.STRING,
  correo: DataTypes.STRING,
  refugio_id: { type: DataTypes.INTEGER, references: { model: Refugio, key: "id" } },
}, { timestamps: false });

Voluntario.belongsTo(Refugio, { foreignKey: "refugio_id", onDelete: "CASCADE" });

export default Voluntario;