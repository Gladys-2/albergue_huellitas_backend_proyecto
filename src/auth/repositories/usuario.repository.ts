import { AppDataSource } from "../../config/db";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";

export const userRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario);

export const findByEmail = async (correo_electronico: string) => {
  return await userRepository.findOneBy({ correo_electronico });
};