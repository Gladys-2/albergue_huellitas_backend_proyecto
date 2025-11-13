import { RefugioRepository } from "../repositories/refugio.repository";

const repo = new RefugioRepository();

export class RefugioService {
  async listarRefugios() {
    return await repo.findAll();
  }

  async obtenerRefugio(id: number) {
    return await repo.findById(id);
  }

  async crearRefugio(data: any) {
    return await repo.create(data);
  }

  async actualizarRefugio(id: number, data: any) {
    return await repo.update(id, data);
  }

  async eliminarRefugio(id: number) {
    return await repo.delete(id);
  }
}