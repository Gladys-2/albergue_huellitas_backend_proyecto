import { Request, Response } from "express";
import Usuario from "../../usuarios/entities/usuario.entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto";

export const registroUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido_paterno, apellido_materno, correo_electronico, contrasena, rol, genero } = req.body;

    if (!nombre || !apellido_paterno || !apellido_materno || !correo_electronico || !contrasena) {
      return res.status(400).json({ message: "Todos los campos obligatorios deben estar completos" });
    }

    const existe = await Usuario.findOne({ where: { correo_electronico } }); // <-- cambio
    if (existe) return res.status(400).json({ message: "Correo ya registrado" });

    const hash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await Usuario.create({ // <-- cambio
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

    res.status(201).json({ message: "Usuario registrado exitosamente", usuario: usuarioSinContrasena });
  } catch (error: any) {
    console.error("Error en registroUsuario:", error);
    res.status(500).json({ message: error.message || "Error interno al registrar usuario" });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { correo_electronico, contrasena } = req.body;

    if (!correo_electronico || !contrasena) {
      return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
    }

    const usuario = await Usuario.findOne({ where: { correo_electronico } }); // <-- cambio
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const hash = usuario.getDataValue("contrasena");
    if (!hash) return res.status(500).json({ message: "Usuario sin contraseña registrada" });

    const passCorrecta = await bcrypt.compare(contrasena, hash);
    if (!passCorrecta) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario.getDataValue("id"), correo_electronico: usuario.getDataValue("correo_electronico") },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    const { contrasena: _, ...usuarioSinContrasena } = usuario.get({ plain: true });
    res.json({ message: "Login exitoso", usuario: usuarioSinContrasena, token });
  } catch (error: any) {
    console.error("Error en loginUsuario:", error);
    res.status(500).json({ message: error.message || "Error interno al iniciar sesión" });
  }
};