import { Request, Response } from "express";
import { RefugioService } from "../services/refugio.service";

const service = new RefugioService();

export const obtenerRefugios = async (req: Request, res: Response) => {
  try {
    const refugios = await service.listarRefugios();
    res.json(refugios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener refugios", error });
  }
};

export const crearRefugio = async (req: Request, res: Response) => {
  try {
    const refugio = await service.crearRefugio(req.body);
    res.status(201).json(refugio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear refugio", error });
  }
};

export const actualizarRefugio = async (req: Request, res: Response) => {
  try {
    const refugio = await service.actualizarRefugio(+req.params.id, req.body);
    if (!refugio) return res.status(404).json({ message: "Refugio no encontrado" });
    res.json(refugio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar refugio", error });
  }
};

export const eliminarRefugio = async (req: Request, res: Response) => {
  try {
    const resultado = await service.eliminarRefugio(+req.params.id);
    if (!resultado) return res.status(404).json({ message: "Refugio no encontrado" });
    res.json({ message: "Refugio eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar refugio", error });
  }
};