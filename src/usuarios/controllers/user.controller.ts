import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const service = new UserService();

export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await service.listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await service.crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await service.actualizarUsuario(+req.params.id, req.body);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const resultado = await service.eliminarUsuario(+req.params.id);
    if (!resultado) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};