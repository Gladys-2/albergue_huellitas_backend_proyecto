import { Request, Response } from "express";
import { AnimalService } from "../services/animal.service";

const service = new AnimalService();

export const obtenerAnimales = async (req: Request, res: Response) => {
  try {
    const animales = await service.listarAnimales();
    res.json(animales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener animales", error });
  }
};

export const crearAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await service.crearAnimal(req.body);
    res.status(201).json(animal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear animal", error });
  }
};