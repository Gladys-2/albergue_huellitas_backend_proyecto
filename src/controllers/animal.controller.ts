import { Request, Response } from "express";
import Animal from "../models/animal.model";
import Refugio from "../models/refugio.model";

export const obtenerAnimales = async (req: Request, res: Response) => {
  try {
    const animales = await Animal.findAll({ include: [Refugio] });
    res.json(animales);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener animales", error });
  }
};
