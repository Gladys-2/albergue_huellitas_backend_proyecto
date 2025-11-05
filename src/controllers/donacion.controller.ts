import { Request, Response } from "express";
import Donacion from "../models/donacion.model";
import User from "../models/user.model";

export const getDonaciones = async (req: Request, res: Response) => {
  try {
    const donaciones = await Donacion.findAll({ include: [User] });
    res.json(donaciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener donaciones", error });
  }
};

export const crearDonacion = async (req: Request, res: Response) => {
  try {
    const { usuario_id, monto, tipo } = req.body;
    const usuario = await User.findByPk(usuario_id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const donacion = await Donacion.create({ usuario_id, monto, tipo });
    res.status(201).json(donacion);
  } catch (error) {
    res.status(500).json({ message: "Error al crear donación", error });
  }
};