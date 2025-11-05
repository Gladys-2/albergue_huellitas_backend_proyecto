import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto";

export const registroUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido_paterno, apellido_materno, correo_electronico, contrasena, rol, genero } = req.body;

    const existe = await User.findOne({ where: { correo_electronico } });
    if (existe) return res.status(400).json({ message: "Correo ya registrado" });

    const hash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await User.create({
      nombre,
      apellido_paterno,
      apellido_materno,
      correo_electronico,
      contrasena: hash,
      rol: rol || "usuario",
      genero,
      estado: "Activo",
    });

    const { contrasena: _, ...usuarioSinContrasena } = nuevoUsuario.get({ plain: true });
    res.json({ message: "Usuario registrado exitosamente", usuario: usuarioSinContrasena });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { correo_electronico, contrasena } = req.body;

    const usuario = await User.findOne({ where: { correo_electronico } });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const passCorrecta = await bcrypt.compare(contrasena, usuario.getDataValue("contrasena"));
    if (!passCorrecta) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario.getDataValue("id"), correo_electronico: usuario.getDataValue("correo_electronico") },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    const { contrasena: _, ...usuarioSinContrasena } = usuario.get({ plain: true });
    res.json({ message: "Login exitoso", usuario: usuarioSinContrasena, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};