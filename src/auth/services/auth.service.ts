import { UsuarioRepository } from "../repositories/usuario.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usuarioRepo = new UsuarioRepository();
const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto";

export class AuthService {
  async registroUsuario(data: any) {
    const { nombre, apellido_paterno, apellido_materno, correo_electronico, contrasena, rol, genero } = data;

    const existe = await usuarioRepo.findByEmail(correo_electronico);
    if (existe) throw new Error("Correo ya registrado");

    const hash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await usuarioRepo.create({
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
    return usuarioSinContrasena;
  }

  async loginUsuario(correo_electronico: string, contrasena: string) {
    const usuario = await usuarioRepo.findByEmail(correo_electronico);
    if (!usuario) throw new Error("Usuario no encontrado");

    const passCorrecta = await bcrypt.compare(contrasena, usuario.getDataValue("contrasena"));
    if (!passCorrecta) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { id: usuario.getDataValue("id"), correo_electronico: usuario.getDataValue("correo_electronico") },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    const { contrasena: _, ...usuarioSinContrasena } = usuario.get({ plain: true });
    return { usuario: usuarioSinContrasena, token };
  }
}