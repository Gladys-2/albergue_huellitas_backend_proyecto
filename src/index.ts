import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/db";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import donacionRoutes from "./routes/donacion.routes";
import animalRoutes from "./routes/animal.routes";
import adopcionRoutes from "./routes/adopcion.routes";
import refugioRoutes from "./routes/refugio.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
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

app.get("/", (req: Request, res: Response) => {
  res.send("API Refugio funcionando correctamente ");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
  });
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a PostgreSQL exitosa");
  } catch (error) {
    console.error("Error al conectar a PostgreSQL", error);
  }
};

testConnection();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});