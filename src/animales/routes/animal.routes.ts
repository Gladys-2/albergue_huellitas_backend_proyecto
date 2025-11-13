import { Router } from "express";
import { obtenerAnimales } from "../controllers/animal.controller";

const router = Router();

router.get("/", obtenerAnimales);

export default router;