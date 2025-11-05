import { Request, Response } from "express";
import Voluntario from "../models/voluntario.model";
import Refugio from "../models/refugio.model";

export const getVoluntarios = async (req: Request, res: Response) => {
  try {
    const voluntarios = await Voluntario.findAll({ include: [Refugio] });
    res.json(voluntarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener voluntarios", error });
  }
};

export const crearVoluntario = async (req: Request, res: Response) => {
  try {
    const { nombre, telefono, correo, refugio_id } = req.body;
    const voluntario = await Voluntario.create({ nombre, telefono, correo, refugio_id });
    res.status(201).json(voluntario);
  } catch (error) {
    res.status(500).json({ message: "Error al crear voluntario", error });
  }
};

export const actualizarVoluntario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, correo, refugio_id } = req.body;

    const voluntario = await Voluntario.findByPk(id);
    if (!voluntario) return res.status(404).json({ message: "Voluntario no encontrado" });

    await voluntario.update({ nombre, telefono, correo, refugio_id });
    res.json(voluntario);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar voluntario", error });
  }
};

export const eliminarVoluntario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const voluntario = await Voluntario.findByPk(id);
    if (!voluntario) return res.status(404).json({ message: "Voluntario no encontrado" });

    await voluntario.destroy();
    res.json({ message: "Voluntario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar voluntario", error });
  }
};