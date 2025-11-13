import { Router } from "express";
import {
  crearVoluntario,
  obtenerVoluntarios,
  actualizarVoluntario,
  eliminarVoluntario,
} from "../controllers/voluntario.controller";

const router = Router();

router.post("/crear-voluntario", crearVoluntario);
router.get("/", obtenerVoluntarios);
router.put("/actualizar-voluntario/:id", actualizarVoluntario);
router.delete("/eliminar-voluntario/:id", eliminarVoluntario);

export default router;