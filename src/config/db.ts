import "reflect-metadata";
import { DataSource } from "typeorm";

import { Usuario } from "../usuarios/entities/usuario.entity";
import { Administrador } from "../administradores/entities/administrador.entity";
import { Donacion } from "../donaciones/entities/donacion.entity";
import { Voluntario } from "../voluntarios/entities/voluntario.entity";
import { Refugio } from "../refugios/entities/refugio.entity";
import { Animal } from "../animales/entities/animal.entity";
import { Adopcion } from "../adopciones/entities/adopcion.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "POSTGRESQL",
  database: process.env.DB_NAME || "albergue",
  synchronize: true, 
  logging: true,
  entities: [
    Usuario,
    Administrador,
    Donacion,
    Voluntario,
    Refugio,
    Animal,
    Adopcion,
  ],
});