import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserService } from "../../usuarios/services/user.service";
import { Usuario } from "../../usuarios/entities/usuario.entity";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto";
const userService = new UserService();

interface UsuarioInput {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo_electronico: string;
  contrasena: string;
  rol?: "usuario" | "administrador";
  estado?: "Activo" | "Inactivo";
  avatarUrl?: string;
}

export const crearUsuarioService = async (data: UsuarioInput) => {
  if (!data.contrasena) throw new Error("La contraseña es obligatoria");

  const existe = await userService.obtenerPorEmail(data.correo_electronico);
  if (existe) throw new Error("Correo ya registrado");

  const hash = await bcrypt.hash(data.contrasena, 10);

  const usuario: Usuario = await userService.crearUsuario({
    ...data,
    contrasena: hash,
    rol: data.rol || "usuario",
    estado: data.estado || "Activo",
    avatarUrl: data.avatarUrl || null,
  });

  const { contrasena, ...usuarioSinContrasena } = usuario;
  return usuarioSinContrasena;
};

export const loginUsuarioService = async (correo_electronico: string, contrasena: string) => {
  if (!correo_electronico || !contrasena) throw new Error("Correo y contraseña son requeridos");

  const usuario: Usuario | null = await userService.obtenerPorEmail(correo_electronico);
  if (!usuario) throw new Error("Usuario no encontrado");

  if (usuario.estado === "Inactivo") throw new Error("Usuario inactivo");

  if (!usuario.contrasena) throw new Error("Usuario sin contraseña");

  const passCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!passCorrecta) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    { id: usuario.id, correo_electronico: usuario.correo_electronico, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  const { contrasena: _, ...usuarioSinContrasena } = usuario;
  return { usuario: usuarioSinContrasena, token };
};