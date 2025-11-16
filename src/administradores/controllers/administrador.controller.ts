import { Request, Response } from "express";
import * as service from "../services/administrador.service";

export const getAdministradores = async (_req: Request, res: Response) => {
  try {
    const admins = await service.getAdministradores();
    res.json(admins);
  } catch (error: any) {
    console.error("Error al obtener administradores:", error);
    res.status(500).json({ message: error.message || "Error al obtener administradores" });
  }
};

export const crearAdministrador = async (req: Request, res: Response) => {
  try {
    const { usuario_id, privilegios } = req.body;
    const admin = await service.crearAdministrador(usuario_id, privilegios);
    res.status(201).json(admin);
  } catch (error: any) {
    console.error("Error al crear administrador:", error);
    res.status(500).json({ message: error.message || "Error al crear administrador" });
  }
};
export const actualizarAdministrador = async (req: Request, res: Response) => {
  try {
    const idAdmin = parseInt(req.params.id, 10);
    const { privilegios } = req.body;

    const admin = await service.actualizarAdministrador(idAdmin, privilegios);
    if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });

    res.json(admin);
  } catch (error: any) {
    console.error("Error al actualizar administrador:", error);
    res.status(500).json({ message: error.message || "Error al actualizar administrador" });
  }
};

export const eliminarAdministrador = async (req: Request, res: Response) => {
  try {
    const idAdmin = parseInt(req.params.id, 10);

    await service.eliminarAdministrador(idAdmin);
    res.json({ message: "Administrador eliminado correctamente" });
  } catch (error: any) {
    console.error("Error al eliminar administrador:", error);
    res.status(500).json({ message: error.message || "Error al eliminar administrador" });
  }
};