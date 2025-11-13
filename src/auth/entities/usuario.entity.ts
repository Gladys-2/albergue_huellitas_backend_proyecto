import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";

const Usuario = sequelize.define(
  "Usuario",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido_paterno: { type: DataTypes.STRING, allowNull: false },
    apellido_materno: { type: DataTypes.STRING, allowNull: false },
    cedula_identidad: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo_electronico: { type: DataTypes.STRING, unique: true, allowNull: false },
    contrasena: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, defaultValue: "usuario" },
    genero: DataTypes.STRING,
    estado: { type: DataTypes.STRING, defaultValue: "Activo" },
  },
  {
    tableName: "usuarios",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Usuario;