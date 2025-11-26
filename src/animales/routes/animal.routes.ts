import { Router } from "express";
import {
  obtenerAnimales,
  obtenerAnimalPorId,
  crearAnimal,
  actualizarAnimal,
  toggleEstadoAnimal
} from "../controllers/animal.controller";

const router = Router();

router.get("/", obtenerAnimales);
router.get("/:id", obtenerAnimalPorId);
router.post("/crear-animal", crearAnimal);
router.put("/editar-animal/:id", actualizarAnimal);
router.patch("/:id/cambiar-estado-animal", toggleEstadoAnimal);

export default router;