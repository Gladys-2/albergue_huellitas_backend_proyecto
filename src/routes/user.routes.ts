import { Router } from "express";
import {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/user.controller";

const router = Router();
router.post("/crear-usuario", crearUsuario);
router.get("/", obtenerUsuarios);
router.put("/actualizar-usuario/:id", actualizarUsuario);
router.delete("/eliminar-usuario/:id", eliminarUsuario);

export default router;