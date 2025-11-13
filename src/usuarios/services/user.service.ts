import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";

const repo = new UserRepository();

export class UserService {
  async listarUsuarios() {
    return await repo.findAll();
  }

  async obtenerUsuario(id: number) {
    return await repo.findById(id);
  }

  async crearUsuario(data: any) {
    if (data.contrasena) {
      data.contrasena = await bcrypt.hash(data.contrasena, 10);
    }
    return await repo.create(data);
  }

  async actualizarUsuario(id: number, data: any) {
    return await repo.update(id, data);
  }

  async eliminarUsuario(id: number) {
    return await repo.delete(id);
  }

  async obtenerPorEmail(email: string) {
    return await repo.findByEmail(email);
  }
}