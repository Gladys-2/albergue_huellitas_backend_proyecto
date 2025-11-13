import { Router } from "express";
import { 
  getAdministradores, 
  crearAdministrador, 
  actualizarAdministrador, 
  eliminarAdministrador 
} from "../controllers/administrador.controller";

const router = Router();

router.get("/", getAdministradores);
router.post("/crear-administrador", crearAdministrador);
router.put("/actualizar-administrador/:id", actualizarAdministrador);
router.delete("/eliminar-administrador/:id", eliminarAdministrador);

export default router;