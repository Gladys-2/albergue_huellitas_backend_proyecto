import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./config/db";

import authRoutes from "./auth/routes/auth.routes";
import userRoutes from "./usuarios/routes/user.routes";
import donacionRoutes from "./donaciones/routes/donacion.routes";
import animalRoutes from "./animales/routes/animal.routes";
import adopcionRoutes from "./adopciones/routes/adopcion.routes";
import refugioRoutes from "./refugios/routes/refugio.routes";
import voluntarioRoutes from "./voluntarios/routes/voluntario.routes";
import administradorRoutes from "./administradores/routes/administrador.routes";
import "./usuarios/entities/usuario.entity";
import "./administradores/entities/administrador.entity";
import "./animales/entities/animal.entity";
import "./adopciones/entities/adopcion.entity";
import "./donaciones/entities/donacion.entity";
import "./refugios/entities/refugio.entity";
import "./voluntarios/entities/voluntario.entity";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.0.7:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/donaciones", donacionRoutes);
app.use("/api/animales", animalRoutes); 
app.use("/api/adopciones", adopcionRoutes);
app.use("/api/refugios", refugioRoutes);
app.use("/api/voluntarios", voluntarioRoutes);
app.use("/api/administradores", administradorRoutes);


app.get("/", (_req: Request, res: Response) => {
  res.send("api--> Refugio Huellitas funcionando correctamente");
});

app.use(
  (err: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Error global:", err.stack);
    res.status(err.status ?? 500).json({
      message: err.message || "Error interno del servidor",
    });
  }
);

const testConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Conexión a PostgreSQL exitosa con TypeORM");
  } catch (error) {
    console.error("Error al conectar a PostgreSQL con TypeORM:", error);
  }
};

testConnection();

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});