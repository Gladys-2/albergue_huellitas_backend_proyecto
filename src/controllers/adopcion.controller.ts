import { Request, Response } from "express";
import Adopcion from "../models/adopcion.model";
import User from "../models/user.model";
import Animal from "../models/animal.model";

export const getAdopciones = async (req: Request, res: Response) => {
  try {
    const adopciones = await Adopcion.findAll({ include: [User, Animal] });
    res.json(adopciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener adopciones", error });
  }
};