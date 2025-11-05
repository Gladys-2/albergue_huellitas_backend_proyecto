import { Request, Response } from "express";
import Refugio from "../models/refugio.model";

{/* Obtener todos los refugios */}
export const obtenerRefugios = async (req: Request, res: Response) => {
  try {
    const refugios = await Refugio.findAll();
    res.json(refugios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener refugios", error });
  }
};

{/* Crear un refugio */}
export const crearRefugio = async (req: Request, res: Response) => {
  try {
    const { nombre, direccion, telefono, correo } = req.body;
    const refugio = await Refugio.create({ nombre, direccion, telefono, correo });
    res.status(201).json(refugio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear refugio", error });
  }
};

{/* Actualizar refugio */}
export const actualizarRefugio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono, correo } = req.body;

    const refugio = await Refugio.findByPk(id);
    if (!refugio) return res.status(404).json({ message: "Refugio no encontrado" });

    await refugio.update({ nombre, direccion, telefono, correo });
    res.json(refugio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar refugio", error });
  }
};

{/* Eliminar refugio */}
export const eliminarRefugio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resultado = await Refugio.destroy({ where: { id } });
    if (!resultado) return res.status(404).json({ message: "Refugio no encontrado" });
    res.json({ message: "Refugio eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar refugio", error });
  }
};