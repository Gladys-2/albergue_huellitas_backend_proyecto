import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "albergue_huellitas",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "123456",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false
  }
);
sequelize.authenticate()
  .catch(err => console.error("Error al conectar a PostgreSQL:", err));