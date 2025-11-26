import { Router } from "express";
import {
  crearUsuario,
  loginUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/user.controller";

const router = Router();

router.post("/registro", crearUsuario);
router.post("/login", loginUsuario);
router.get("/", obtenerUsuarios);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;