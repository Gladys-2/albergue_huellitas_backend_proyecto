import { Request, Response } from "express";
import { AppDataSource } from "../../config/db";
import { Donacion } from "../entities/donacion.entity";

export const obtenerDonaciones = async (_req: Request, res: Response) => {
  try {
    const donaciones = await AppDataSource.getRepository(Donacion).find();
    res.json(donaciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener donaciones", error });
  }
};

export const crearDonacion = async (req: Request, res: Response) => {
  try {
    const repo = AppDataSource.getRepository(Donacion);
    const nueva = repo.create(req.body);
    const guardada = await repo.save(nueva);
    res.status(201).json(guardada);
  } catch (error) {
    res.status(500).json({ message: "Error al crear donación", error });
  }
};