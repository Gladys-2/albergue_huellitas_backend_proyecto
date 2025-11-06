import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const Refugio = sequelize.define("Refugio", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  direccion: DataTypes.STRING,
  telefono: DataTypes.STRING,
  correo: DataTypes.STRING,
  fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  fecha_actualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

export default Refugio;