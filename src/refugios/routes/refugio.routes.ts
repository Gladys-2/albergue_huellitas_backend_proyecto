import { Router } from "express";
import { obtenerRefugios, crearRefugio, eliminarRefugio } from "../controllers/refugio.controller";

const router = Router();

router.get("/", obtenerRefugios);
router.post("/", crearRefugio);
router.delete("/:id", eliminarRefugio);

export default router;