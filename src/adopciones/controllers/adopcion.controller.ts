import { Request, Response } from "express";
import { AdopcionService } from "../services/adopcion.services";

const service = new AdopcionService();

export const getAdopciones = async (req: Request, res: Response) => {
  try {
    const adopciones = await service.listarAdopciones();
    res.json(adopciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener adopciones", error });
  }
};

export const crearAdopcion = async (req: Request, res: Response) => {
  try {
    const adopcion = await service.crearAdopcion(req.body);
    res.status(201).json(adopcion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear adopción", error });
  }
};