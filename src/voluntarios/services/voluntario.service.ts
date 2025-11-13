import { VoluntarioRepository } from "../repositories/voluntario.repository";

const repo = new VoluntarioRepository();

export class VoluntarioService {
  async listarVoluntarios() {
    return await repo.findAll();
  }

  async obtenerVoluntario(id: number) {
    return await repo.findById(id);
  }

  async crearVoluntario(data: any) {
    return await repo.create(data);
  }

  async actualizarVoluntario(id: number, data: any) {
    return await repo.update(id, data);
  }

  async eliminarVoluntario(id: number) {
    return await repo.delete(id);
  }
}