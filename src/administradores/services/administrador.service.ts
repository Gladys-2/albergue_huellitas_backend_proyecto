import * as repo from "../repositories/administrador.repository";
import Usuario from "../../usuarios/entities/usuario.entity";

export const getAdministradores = async () => {
  return await repo.findAllAdmins();
};

export const crearAdministrador = async (usuario_id: number, privilegios: string) => {
  const usuario = await Usuario.findByPk(usuario_id);
  if (!usuario) throw new Error("Usuario no encontrado");
  return await repo.createAdmin({ usuario_id, privilegios });
};