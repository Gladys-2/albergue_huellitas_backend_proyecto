// src/routes/donacion.routes.ts
import { Router } from "express";
import { obtenerDonaciones, crearDonacion } from "../controllers/donacion.controller";

const router = Router();

router.get("/", obtenerDonaciones); 
router.post("/crear", crearDonacion);   

export default router;
