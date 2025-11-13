import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import Usuario from "../../usuarios/entities/usuario.entity";
import Animal from "../../animales/entities/animal.entity";

const Adopcion = sequelize.define("Adopcion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: { model: Usuario, key: "id" },
  },
  animal_id: {
    type: DataTypes.INTEGER,
    references: { model: Animal, key: "id" },
  },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  estado: DataTypes.STRING,
}, {
  tableName: "adopciones",
  timestamps: false,
});

Adopcion.belongsTo(Usuario, { foreignKey: "usuario_id" });
Adopcion.belongsTo(Animal, { foreignKey: "animal_id" });

export default Adopcion;