import { Router } from "express";
import { getAdopciones } from "../controllers/adopcion.controller";

const router = Router();

router.get("/", getAdopciones);

export default router;