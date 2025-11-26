import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";

const userRepo = new UserRepository();

// Crear usuario
export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      correo_electronico,
      contrasena,
      rol,
      genero,
      estado,
    } = req.body;

    if (!contrasena)
      return res.status(400).json({ message: "Contraseña es obligatoria" });

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await userRepo.create({
      nombre,
      apellido_paterno,
      apellido_materno,
      correo_electronico,
      contrasena: hashedPassword,
      rol: rol ?? "usuario",
      genero,
      estado: estado ?? "Activo",
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await userRepo.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      correo_electronico,
      contrasena,
      rol,
      genero,
      estado,
    } = req.body;

    const data: any = {
      nombre,
      apellido_paterno,
      apellido_materno,
      correo_electronico,
      rol,
      genero,
      estado,
    };

    if (contrasena) {
      data.contrasena = await bcrypt.hash(contrasena, 10);
    }

    const usuarioActualizado = await userRepo.update(Number(id), data);

    if (!usuarioActualizado)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(usuarioActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userRepo.delete(Number(id));
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

// Login
export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { correo_electronico, contrasena } = req.body;

    const usuario = await userRepo.findByEmail(correo_electronico);

    if (!usuario)
      return res.status(400).json({ message: "Usuario o contraseña incorrecta" });

    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena!);

    if (!isMatch)
      return res.status(400).json({ message: "Usuario o contraseña incorrecta" });

    res.json({ usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};