import { Router } from "express";
import { getDonaciones, crearDonacion } from "../controllers/donacion.controller";

const router = Router();

router.get("/", getDonaciones);
router.post("/", crearDonacion);

export default router;