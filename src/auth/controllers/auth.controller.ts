import { Request, Response } from "express";
import { crearUsuarioService, loginUsuarioService } from "../services/auth.service";

export const registroUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await crearUsuarioService(req.body);
    res.status(201).json({ message: "Usuario registrado exitosamente", usuario });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { correo_electronico, contrasena } = req.body;
    const result = await loginUsuarioService(correo_electronico, contrasena);

    res.json({ message: "Login exitoso", ...result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};