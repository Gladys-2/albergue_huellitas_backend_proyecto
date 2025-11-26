import { Request, Response } from "express";
import { AdopcionService } from "../services/adopcion.services";

const service = new AdopcionService();

export const crearAdopcion = async (req: Request, res: Response) => {
  try {
    const adopcion = await service.crearAdopcion(req.body);
    res.status(201).json(adopcion);
  } catch (error) {
    console.error("Error al crear adopción:", error);
    res.status(500).json({ message: "Error al crear adopción" });
  }
};

export const getAdopciones = async (_req: Request, res: Response) => {
  try {
    const adopciones = await service.listarAdopciones();
    res.status(200).json(adopciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener adopciones" });
  }
};

export const getMisAdopciones = async (req: Request, res: Response) => {
  try {
    const usuarioId = Number(req.params.usuarioId);

    if (isNaN(usuarioId)) {
      return res.status(400).json({ message: "UsuarioId inválido" });
    }

    const adopciones = await service.listarAdopcionesPorUsuario(usuarioId);
    res.status(200).json(adopciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener mis adopciones" });
  }
};