import { Router } from "express";
import { getAdopciones, crearAdopcion, getMisAdopciones } from "../controllers/adopcion.controller";

const router = Router();

router.get("/", getAdopciones);
router.post("/", crearAdopcion);
router.get("/usuario/:usuarioId", getMisAdopciones);

export default router;