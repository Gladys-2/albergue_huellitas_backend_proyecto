import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      cedula_identidad,
      telefono,
      correo_electronico,
      contrasena,
      rol,
      genero,
      estado,
    } = req.body;

    const existe = await User.findOne({ where: { correo_electronico } });
    if (existe)
      return res.status(400).json({ message: "Correo ya registrado" });

    const hash = await bcrypt.hash(contrasena, 10);

    const usuario = await User.create({
      nombre,
      apellido_paterno,
      apellido_materno,
      cedula_identidad,
      telefono,
      correo_electronico,
      contrasena: hash,
      rol: rol || "usuario",
      genero,
      estado: estado || "Activo",
    });

    const { contrasena: _, ...usuarioSinContrasena } = usuario.get({ plain: true });
    res.json({ message: "Usuario creado exitosamente", usuario: usuarioSinContrasena });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await User.findAll({ attributes: { exclude: ["contrasena"] } });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      cedula_identidad,
      telefono,
      genero,
      rol,
      estado,
    } = req.body;

    const usuario = await User.findByPk(id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    await usuario.update({
      nombre,
      apellido_paterno,
      apellido_materno,
      cedula_identidad,
      telefono,
      genero,
      rol,
      estado,
    });

    const { contrasena: _, ...usuarioSinContrasena } = usuario.get({ plain: true });
    res.json({ message: "Usuario actualizado correctamente", usuario: usuarioSinContrasena });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resultado = await User.destroy({ where: { id } });
    if (!resultado) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};