import { Request, Response } from "express";
import { AnimalService } from "../services/animal.service";

const service = new AnimalService();

export const obtenerAnimales = async (_req: Request, res: Response) => {
  const animales = await service.listarAnimales();
  res.json(animales);
};

export const obtenerAnimalPorId = async (req: Request, res: Response) => {
  const animal = await service.obtenerAnimal(Number(req.params.id));
  if (!animal) return res.status(404).json({ message: "Animal no encontrado" });
  res.json(animal);
};

export const crearAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await service.crearAnimal(req.body);
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar el animal" });
  }
};

export const actualizarAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await service.actualizarAnimal(Number(req.params.id), req.body);
    if (!animal) return res.status(404).json({ message: "Animal no encontrado" });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el animal" });
  }
};

export const toggleEstadoAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await service.toggleEstadoAnimal(Number(req.params.id));
    if (!animal) return res.status(404).json({ message: "Animal no encontrado" });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar estado del animal" });
  }
};