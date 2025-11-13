import { Request, Response } from "express";
import Voluntario from "../entities/voluntario.entity";

export const crearVoluntario = async (req: Request, res: Response) => {
  try {
    const voluntario = await Voluntario.create(req.body);
    res.status(201).json(voluntario);
  } catch (error) {
    console.error("Error al crear voluntario:", error);
    res.status(500).json({ message: "Error al crear voluntario" });
  }
};

export const obtenerVoluntarios = async (_req: Request, res: Response) => {
  try {
    const voluntarios = await Voluntario.findAll();
    res.status(200).json(voluntarios);
  } catch (error) {
    console.error("Error al obtener voluntarios:", error);
    res.status(500).json({ message: "Error al obtener voluntarios" });
  }
};

export const actualizarVoluntario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Voluntario.update(req.body, { where: { id } });

    if (updated) {
      const voluntarioActualizado = await Voluntario.findByPk(id);
      res.status(200).json(voluntarioActualizado);
    } else {
      res.status(404).json({ message: "Voluntario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar voluntario:", error);
    res.status(500).json({ message: "Error al actualizar voluntario" });
  }
};

export const eliminarVoluntario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eliminado = await Voluntario.destroy({ where: { id } });

    if (eliminado) {
      res.status(200).json({ message: "Voluntario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Voluntario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar voluntario:", error);
    res.status(500).json({ message: "Error al eliminar voluntario" });
  }
};