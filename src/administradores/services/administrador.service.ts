import { AppDataSource } from "../../config/db";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Administrador } from "../entities/administrador.entity";

const usuarioRepo = AppDataSource.getRepository(Usuario);
const adminRepo = AppDataSource.getRepository(Administrador);

export const getAdministradores = async (): Promise<Administrador[]> => {
  return await adminRepo.find({ relations: ["usuario"] });
};

export const crearAdministrador = async (usuario_id: number, privilegios: string): Promise<Administrador> => {
  const usuario = await usuarioRepo.findOne({ where: { id: usuario_id } });
  if (!usuario) throw new Error("Usuario no encontrado");

  const nuevoAdmin = adminRepo.create({
    usuario,
    privilegios,
  });

  return await adminRepo.save(nuevoAdmin);
};

// Actualizar administrador
export const actualizarAdministrador = async (id: number, privilegios: string): Promise<Administrador> => {
  const admin = await adminRepo.findOne({ where: { id }, relations: ["usuario"] });
  if (!admin) throw new Error("Administrador no encontrado");

  admin.privilegios = privilegios;

  return await adminRepo.save(admin);
};

// Eliminar administrador
export const eliminarAdministrador = async (id: number): Promise<void> => {
  const admin = await adminRepo.findOne({ where: { id } });
  if (!admin) throw new Error("Administrador no encontrado");

  await adminRepo.remove(admin);
};