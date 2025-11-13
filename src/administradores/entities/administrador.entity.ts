import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import Usuario from "../../usuarios/entities/usuario.entity";

const Administrador = sequelize.define(
  "Administrador",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    privilegios: {
      type: DataTypes.TEXT,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "administradores",
    timestamps: false,
  }
);

Usuario.hasOne(Administrador, { foreignKey: "usuario_id" });
Administrador.belongsTo(Usuario, { foreignKey: "usuario_id" });

export default Administrador;
