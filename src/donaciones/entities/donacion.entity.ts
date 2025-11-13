import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import Usuario from "../../usuarios/entities/usuario.entity";

const Donacion = sequelize.define("Donacion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Usuario, key: "id" },
  },
  monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  tipo: DataTypes.STRING,
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "donaciones",
  timestamps: false,
});

Donacion.belongsTo(Usuario, { foreignKey: "usuario_id", onDelete: "CASCADE" });

export default Donacion;