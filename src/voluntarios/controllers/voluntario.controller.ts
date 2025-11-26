import { Request, Response } from "express";
import { VoluntarioService } from "../services/voluntario.service";

const voluntarioService = new VoluntarioService();

// Crear voluntario
export const crearVoluntario = async (req: Request, res: Response) => {
  try {
    const voluntario = await voluntarioService.crearVoluntario(req.body);
    res.status(201).json(voluntario);
  } catch (error) {
    console.error("Error al crear voluntario:", error);
    res.status(500).json({ message: "Error al crear voluntario" });
  }
};

// Obtener todos los voluntarios
export const obtenerVoluntarios = async (_req: Request, res: Response) => {
  try {
    const voluntarios = await voluntarioService.listarVoluntarios();
    res.status(200).json(voluntarios);
  } catch (error) {
    console.error("Error al obtener voluntarios:", error);
    res.status(500).json({ message: "No se pudieron cargar los voluntarios." });
  }
};

// Actualizar voluntario
export const actualizarVoluntario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const actualizado = await voluntarioService.actualizarVoluntario(Number(id), req.body);
    if (actualizado.affected && actualizado.affected > 0) {
      const voluntarioActualizado = await voluntarioService.obtenerVoluntario(Number(id));
      res.status(200).json(voluntarioActualizado);
    } else {
      res.status(404).json({ message: "Voluntario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar voluntario:", error);
    res.status(500).json({ message: "Error al actualizar voluntario" });
  }
};

// Eliminar voluntario
export const eliminarVoluntario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eliminado = await voluntarioService.eliminarVoluntario(Number(id));
    if (eliminado.affected && eliminado.affected > 0) {
      res.status(200).json({ message: "Voluntario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Voluntario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar voluntario:", error);
    res.status(500).json({ message: "Error al eliminar voluntario" });
  }
};