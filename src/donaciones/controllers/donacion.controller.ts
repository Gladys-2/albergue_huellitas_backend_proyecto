import { Request, Response } from "express";
import { DonacionService } from "../services/donacion.service";

const service = new DonacionService();

export const getDonaciones = async (req: Request, res: Response) => {
  try {
    const donaciones = await service.listarDonaciones();
    res.json(donaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener donaciones", error });
  }
};

export const crearDonacion = async (req: Request, res: Response) => {
  try {
    const donacion = await service.crearDonacion(req.body);
    res.status(201).json(donacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear donación", error });
  }
};