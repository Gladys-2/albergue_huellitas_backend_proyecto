import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
  apellido_paterno: DataTypes.STRING,
  apellido_materno: DataTypes.STRING,
  cedula_identidad: DataTypes.STRING,
  telefono: DataTypes.STRING,
  correo_electronico: DataTypes.STRING,
  contrasena: DataTypes.STRING,
  rol: {
    type: DataTypes.STRING,
    defaultValue: "usuario",
  },
  genero: DataTypes.STRING,
  estado: {
    type: DataTypes.STRING,
    defaultValue: "Activo",
  },
}, {
  tableName: "usuarios",
  timestamps: true,
  createdAt: "createdAt", 
  updatedAt: "updatedAt",
});

export default User;